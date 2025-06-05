import { IsEmail, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsEmail()
  owner: string;
}
