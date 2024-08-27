/* eslint-disable prettier/prettier */
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

/* eslint-disable prettier/prettier */
export default class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  name: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
