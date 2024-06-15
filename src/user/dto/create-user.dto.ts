import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @MaxLength(16, { message: 'Username must not be more than 16 characters.' })
  @MinLength(3, { message: 'Username must be at least 3 characters.' })
  @IsString({ message: 'Username must be a string.' })
  @IsNotEmpty({ message: 'Username ie required.' })
  username: string;

  // @IsStrongPassword({}, { message: 'Password must be strong enough.' })
  @MaxLength(16, { message: 'Password must not be more than 16 characters.' })
  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;

  @IsUrl({}, { message: 'Avatar URL must be a valid URL.' })
  @IsString({ message: 'Avatar URL must be a string.' })
  @IsOptional()
  avatarUrl: string;
}
