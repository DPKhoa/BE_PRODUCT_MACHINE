/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComboDetailService } from './combo_detail.service';
import { CreateComboDetailDto } from './dto/create-combo_detail.dto';
import { UpdateComboDetailDto } from './dto/update-combo_detail.dto';

@Controller('combo-detail')
export class ComboDetailController {
  constructor(private readonly comboDetailService: ComboDetailService) {}

  @Post()
  create(@Body() createComboDetailDto: CreateComboDetailDto) {
    return this.comboDetailService.create(createComboDetailDto);
  }

  @Get()
  findAll() {
    return this.comboDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comboDetailService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComboDetailDto: UpdateComboDetailDto,
  ) {
    return this.comboDetailService.update(+id, updateComboDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comboDetailService.remove(+id);
  }
}
