import { PartialType } from '@nestjs/swagger';
import { CreateGoodsDetailDto } from './create-goods-detail.dto';

export class UpdateGoodsDetailDto extends PartialType(CreateGoodsDetailDto) {}
