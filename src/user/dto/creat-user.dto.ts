import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;

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
