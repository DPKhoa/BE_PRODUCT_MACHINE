/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'output/entities/Brand';
import { Repository } from 'typeorm';
import { Category } from 'output/entities/Category';
import { Product } from 'output/entities/Product';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  //CreateBrand
  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand = this.brandRepository.create({
      ...createBrandDto,

      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.brandRepository.save(brand);
  }

  //GetAllBrand
  async findAll(): Promise<{ brands: Brand[] }> {
    const brands = await this.brandRepository.find();
    return { brands };
  }

  //GetBrandById
  async findOne(id: number): Promise<Brand> {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return brand;
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

  async deleteBrand(id: number): Promise<{ message: string }> {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    //Kiểm tra nếu brand đang được sử dụng trong Category
    const relatedCategories = await this.categoryRepository.find({
      where: { brand: { id } },
    });
    if (relatedCategories.length > 0) {
      throw new BadRequestException(
        `Cannot delete Brand with ID ${id} because it is linked to one or more categories`,
      );
    }
    //Kiểm tra brand có tồn tại trong Product không
    const productCount = await this.productRepository
      .createQueryBuilder('product')
      .innerJoin('product.category', 'category')
      .where('category.brand = :brand', { brand: id })
      .getCount();
    if (productCount > 0) {
      throw new BadRequestException(
        `Brand with ID ${id} is associated with existing products`,
      );
    }

    // Xóa Brand
    const result = await this.brandRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    // Cập nhật ID của các Brand còn lại
    // await this.brandRepository.query(
    //   `UPDATE "brand" SET "id"= "id"-1 WHERE "id"> $1`,
    //   [id],
    // );
    // await this.brandRepository.query(
    //   `ALTER SEQUENCE brand_id_seq RESTART WITH(SELECT MAX(id)+1 FROM "brand");`,
    // );
    return { message: `Brand with ID ${id} has been successfully removed` };
  }
}
