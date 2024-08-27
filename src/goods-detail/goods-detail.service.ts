import { Injectable } from '@nestjs/common';
import { CreateGoodsDetailDto } from './dto/create-goods-detail.dto';
import { UpdateGoodsDetailDto } from './dto/update-goods-detail.dto';

@Injectable()
export class GoodsDetailService {
  create(createGoodsDetailDto: CreateGoodsDetailDto) {
    return 'This action adds a new goodsDetail';
  }

  findAll() {
    return `This action returns all goodsDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} goodsDetail`;
  }

  update(id: number, updateGoodsDetailDto: UpdateGoodsDetailDto) {
    return `This action updates a #${id} goodsDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} goodsDetail`;
  }
}
