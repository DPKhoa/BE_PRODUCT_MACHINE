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
    const { ...categoryDetails } = createCategoryDto;

    const category = this.categoryRespository.create({
      ...categoryDetails,
      status:
        categoryDetails.status !== undefined ? categoryDetails.status : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.categoryRespository.save(category);
  }

  async findAll(): Promise<Category[]> {
    try {
      const categories = await this.categoryRespository.find({
        where: { status: true },
      });
      if (!categories || categories.length === 0) {
        // console.log('No brands found.');
        return [];
      }
      return categories;
    } catch (error) {
      throw new Error('Failed to retrieve categories');
    }
  }

  async findOne(categoryId: number) {
    const category = await this.categoryRespository.findOne({
      where: { categoryId, status: true },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} nto found`);
    }
    return { category };
  }

  async updateCategory(
    categoryId: number,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.categoryRespository.findOne({
      where: { categoryId },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} nto found`);
    }

    // Kiểm tra nếu category đã có brand thì không thể cập nhật brand

    category.updatedAt = new Date();
    // Cập nhật các thuộc tính của category
    Object.assign(category, updateCategoryDto);

    return this.categoryRespository.save(category);
  }

  async deleteCategory(categoryId: number): Promise<{ message: string }> {
    const category = await this.categoryRespository.findOne({
      where: { categoryId, status: true },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    // Tìm các Product liên kết với Category
    const relatedProducts = await this.productRepository.find({
      where: { category: { categoryId } },
    });

    if (relatedProducts.length > 0) {
      // Xóa các Product liên kết
      await this.productRepository.update(
        { category: { categoryId } },
        { category: null }, // Hoặc gán một Category khác nếu cần
      );
    }

    //Xóa Category
    await this.categoryRespository.remove(category);
    return { message: `Category with ID ${categoryId} successfully deleted` };
  }
}
