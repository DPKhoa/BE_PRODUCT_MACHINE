/* eslint-disable prettier/prettier */
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

/* eslint-disable prettier/prettier */
export class CreateEventDto {
  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  name?: string;

  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  image?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
