import { Injectable } from '@nestjs/common';
import { CreateComboDetailDto } from './dto/create-combo_detail.dto';
import { UpdateComboDetailDto } from './dto/update-combo_detail.dto';

@Injectable()
export class ComboDetailService {
  create(createComboDetailDto: CreateComboDetailDto) {
    return 'This action adds a new comboDetail';
  }

  findAll() {
    return `This action returns all comboDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comboDetail`;
  }

  update(id: number, updateComboDetailDto: UpdateComboDetailDto) {
    return `This action updates a #${id} comboDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} comboDetail`;
  }
}
