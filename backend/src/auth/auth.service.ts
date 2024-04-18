import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import UserEntity from './entities/user.entity';
import { FirebaseAdmin } from '../../config/firebase.setup';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
    private readonly em: EntityManager,
    private readonly firebaseAdmin: FirebaseAdmin,
  ) {}
  async create(registerAuthDto: RegisterAuthDto) {
    try {
      const [isEmailExist, isUsernameExist] = await Promise.all([
        this.userRepository.count({
          email: registerAuthDto.email,
        }),
        this.userRepository.count({
          username: registerAuthDto.username,
        }),
      ]);

      if (isEmailExist > 0) {
        throw new ConflictException('Email already exist');
      }
      if (isUsernameExist > 0) {
        throw new ConflictException('Username already exist');
      }

      const adminApp = this.firebaseAdmin.setup();

      const firebaseUser = await adminApp.auth().createUser({
        email: registerAuthDto.email,
        password: registerAuthDto.password,
        displayName: registerAuthDto.fullname,
      });

      this.userRepository.create({
        email: registerAuthDto.email,
        uid: firebaseUser.uid,
        fullName: registerAuthDto.fullname,
      });

      await this.em.flush();

      const token = await adminApp.auth().createCustomToken(firebaseUser.uid);
      return { token };
    } catch (error) {
      throw error;
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const adminApp = this.firebaseAdmin.setup();
      const verify = await adminApp.auth().verifyIdToken(loginAuthDto.token);
      const user = await this.userRepository.findOneOrFail({
        email: verify.email,
      });

      this.userRepository.assign(user, {
        lastLoginAt: new Date(),
      });

      await this.em.flush();

      return { user };
    } catch (error) {
      throw error;
    }
  }
}
