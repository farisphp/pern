import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterAuthDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
