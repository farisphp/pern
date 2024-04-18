import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import UserEntity from './entities/user.entity';
import { FirebaseAdmin } from '../../config/firebase.setup';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
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

      await adminApp.auth().createUser({
        email: registerAuthDto.email,
        password: registerAuthDto.password,
        displayName: registerAuthDto.fullname,
      });

      const registeredUserPayload = this.userRepository.create({
        email: registerAuthDto.email,
        username: registerAuthDto.username,
        fullName: registerAuthDto.fullname,
      });

      await this.userRepository.insert(registeredUserPayload);

      return registeredUserPayload;
    } catch (error) {
      throw error;
    }
  }

  login(loginAuthDto: LoginAuthDto) {
    return `This action login`;
  }
}
