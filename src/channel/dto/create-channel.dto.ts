import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateChannelDto {
  @MaxLength(16, { message: "Channel name can't be more than 16 characters." })
  @MinLength(3, { message: 'Channel name must be at least 3 characters.' })
  @IsString({ message: 'Channel name must be a string.' })
  @IsNotEmpty({ message: 'Channel name is required.' })
  name: string;

  @IsNumber({}, { message: 'Workspace ID must be a number.' })
  @IsNotEmpty({ message: 'Workspace ID is required.' })
  workspaceId: number;
}
