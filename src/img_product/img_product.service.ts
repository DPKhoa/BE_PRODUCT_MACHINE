import { Injectable } from '@nestjs/common';
import { CreateImgProductDto } from './dto/create-img_product.dto';
import { UpdateImgProductDto } from './dto/update-img_product.dto';

@Injectable()
export class ImgProductService {
  create(createImgProductDto: CreateImgProductDto) {
    return 'This action adds a new imgProduct';
  }

  findAll() {
    return `This action returns all imgProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imgProduct`;
  }

  update(id: number, updateImgProductDto: UpdateImgProductDto) {
    return `This action updates a #${id} imgProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} imgProduct`;
  }
}
