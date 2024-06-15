import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateWorkspaceDto {
  @MaxLength(50, {
    message: 'Workspace name must not be more than 50 characters.',
  })
  @MinLength(3, { message: 'Workspace name must be at least 3 characters.' })
  @IsString({ message: 'Workspace name must be a string.' })
  @IsNotEmpty({ message: 'Workspace name is required.' })
  name: string;

  @MaxLength(16, {
    message: "Workspace code can't be more than 16 characters.",
  })
  @MinLength(6, { message: 'Workspace code must be at least 6 characters.' })
  @IsString({ message: 'Workspace code must be a string.' })
  @IsOptional()
  code: string;

  @IsUrl({}, { message: 'Logo URL must be a valid URL.' })
  @IsString({ message: 'Logo URL must be a string.' })
  @IsOptional()
  logoUrl: string;
}
