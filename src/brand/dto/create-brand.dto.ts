/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  image?: string;
}
