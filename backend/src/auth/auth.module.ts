import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { FirebaseAdmin } from 'config/firebase.setup';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import UserEntity from './entities/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService, FirebaseAdmin],
})
export class AuthModule {}
