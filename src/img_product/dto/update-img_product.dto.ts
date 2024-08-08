import { PartialType } from '@nestjs/swagger';
import { CreateImgProductDto } from './create-img_product.dto';

export class UpdateImgProductDto extends PartialType(CreateImgProductDto) {}
