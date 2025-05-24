import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'StrongPassword123!',
  })
  @IsStrongPassword({
    // minLength: 6,
    // minLowercase: 1,
    // minUppercase: 1,
    // minNumbers: 1,
    // minSymbols: 1,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
