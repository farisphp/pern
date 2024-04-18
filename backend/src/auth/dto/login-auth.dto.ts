import { IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty()
  token: string;
}
