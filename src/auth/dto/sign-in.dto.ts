import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty({ message: 'Username is required to sign-in.' })
  username: string;

  @IsNotEmpty({ message: 'Password is required to sign-in.' })
  password: string;
}
