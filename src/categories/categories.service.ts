/* eslint-disable prettier/prettier */
import { Category } from './../../output/entities/Category';
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
import { Repository } from 'typeorm';
import { Brand } from 'output/entities/Brand';
import { Product } from 'output/entities/Product';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRespository: Repository<Category>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
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
      brand: brand || null, // Gán brand nếu tồn tại, nếu không thì null
      status:
        categoryDetails.status !== undefined ? categoryDetails.status : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.categoryRespository.save(category);
  }

  async findAll(): Promise<{ categories: Category[] }> {
    try {
      const categories = await this.categoryRespository.find({
        where: { status: true },
      });
      return { categories };
    } catch (error) {
      throw new Error('Failed to retrieve categories');
    }
  }

  async findOne(id: number) {
    const category = await this.categoryRespository.findOne({
      where: { id, status: true },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} nto found`);
    }
    return { category };
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRespository.findOne({
      where: { id, status: true },
      relations: ['brand'],
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} nto found`);
    }

    // Kiểm tra nếu category đã có brand thì không thể cập nhật brand

    if (
      category.brand &&
      updateCategoryDto.idBrand &&
      category.brand.id !== updateCategoryDto.idBrand
    ) {
      throw new BadRequestException(
        `Category with ID ${id} already has a brand and cannot be updated`,
      );
    }
    // Cập nhật brand nếu category chưa có brand
    if (!category.brand && updateCategoryDto.idBrand) {
      const brand = await this.brandRepository.findOne({
        where: { id: updateCategoryDto.idBrand },
      });
      if (!brand) {
        throw new BadRequestException(
          `Brand with ID ${updateCategoryDto.idBrand} does not exist`,
        );
      }
      category.brand = brand;
    }
    category.updatedAt = new Date();
    // Cập nhật các thuộc tính của category
    Object.assign(category, updateCategoryDto);

    return this.categoryRespository.save(category);
  }

  async deleteCategory(id: number): Promise<{ message: string }> {
    const category = await this.categoryRespository.findOne({
      where: { id, status: true },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // Tìm các Product liên kết với Category
    const relatedProducts = await this.productRepository.find({
      where: { category: { id } },
    });

    if (relatedProducts.length > 0) {
      // Xóa các Product liên kết
      await this.productRepository.update(
        { category: { id } },
        { category: null }, // Hoặc gán một Category khác nếu cần
      );
    }

    //Xóa Category
    await this.categoryRespository.remove(category);
    return { message: `Category with ID ${id} successfully deleted` };
  }
}
