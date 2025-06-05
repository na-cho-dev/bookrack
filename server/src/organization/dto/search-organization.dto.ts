import { IsOptional, IsString } from 'class-validator';

export class SearchOrganizationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  owner?: string;
}
