import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'StrongPassword123!',
  })
  @IsStrongPassword({})
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The id of the organization the user belongs to',
    example: '60d21b4667d0d8992e610c85',
  })
  @IsString()
  @IsNotEmpty()
  organizationName: string;

  @ApiProperty({
    description: 'The description of the organization',
    example: 'This is a sample organization.',
  })
  @IsString()
  @IsNotEmpty()
  organizationDescription: string;
}
