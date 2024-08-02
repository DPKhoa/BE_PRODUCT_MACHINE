/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import CreateCategoryDto from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'output/entities/Category';
import { Repository } from 'typeorm';
import { Brand } from 'output/entities/Brand';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRespository: Repository<Category>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { idBrand, ...categoryDetails } = createCategoryDto;
    let brand = null;
    if (idBrand) {
      brand = await this.brandRepository.findOne({
        where: { id: idBrand },
      });

      if (!brand) {
        throw new BadRequestException(
          `Brand with ID ${idBrand} does not exist`,
        );
      }
    }
    const category = this.categoryRespository.create({
      ...categoryDetails,
      brand,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.categoryRespository.save(category);
  }

  async findAll(): Promise<{ categories: Category[] }> {
    try {
      const categories = await this.categoryRespository.find();
      return { categories };
    } catch (error) {
      throw new Error('Failed to retrieve categories');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRespository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} nto found`);
    }
    category.updatedAt = new Date();
    Object.assign(category, updateCategoryDto);
    return this.categoryRespository.save(category);
  }

  // async deleteCategory(id: number, idBrand: number): Promise<string> {
  //   const result = await this.categoryRespository.delete({ id, idBrand });
  //   if (result.affected === 0) {
  //     throw new NotFoundException(
  //       `Category with ID ${id} and Brand ID ${idBrand} not found`,
  //     );
  //   }
  //   return `Category with ID ${id} successfully deleted`;
  // }
}
