/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'output/entities/Brand';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}
  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand = this.brandRepository.create({
      ...createBrandDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.brandRepository.save(brand);
  }

  async findAll(): Promise<{ brands: Brand[] }> {
    const brands = await this.brandRepository.find();
    return { brands };
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  async updateBrand(id: number, updateBrandDto: UpdateBrandDto) {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    brand.updatedAt = new Date();
    Object.assign(brand, updateBrandDto);

    return this.brandRepository.save(brand);
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
