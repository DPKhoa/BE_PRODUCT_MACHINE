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
  async findAll(): Promise<{
    status: string;
    code: number;
    message: string;
    data: Brand[];
  }> {
    const brands = await this.brandRepository.find();
    return {
      status: 'success',
      code: 200,
      message: 'get all brand successfully',
      data: brands,
    };
  }

  //GetBrandById
  async findOne(brandId: number): Promise<Brand> {
    const brand = await this.brandRepository.findOne({ where: { brandId } });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${brandId} not found`);
    }
    return brand;
  }

  async updateBrand(brandId: number, updateBrandDto: UpdateBrandDto) {
    const brand = await this.brandRepository.findOne({ where: { brandId } });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${brandId} not found`);
    }
    brand.updatedAt = new Date();
    Object.assign(brand, updateBrandDto);

    return this.brandRepository.save(brand);
  }

  async deleteBrand(brandId: number): Promise<{ message: string }> {
    const brand = await this.brandRepository.findOne({ where: { brandId } });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${brandId} not found`);
    }

    //Kiểm tra nếu brand đang được sử dụng trong Product
    const relatedProduct = await this.productRepository.find({
      where: { brand: { brandId } },
    });
    if (relatedProduct.length > 0) {
      throw new BadRequestException(
        `Cannot delete Brand with ID ${brandId} because it is linked to one or more categories`,
      );
    }
    //Kiểm tra brand có tồn tại trong Product không
    // const productCount = await this.productRepository
    //   .createQueryBuilder('product')
    //   .innerJoin('product.category', 'category')
    //   .where('category.brand = :brand', { brand: id })
    //   .getCount();
    // if (productCount > 0) {
    //   throw new BadRequestException(
    //     `Brand with ID ${id} is associated with existing products`,
    //   );
    // }

    // Xóa Brand
    const result = await this.brandRepository.delete(brandId);
    if (result.affected === 0) {
      throw new NotFoundException(`Brand with ID ${brandId} not found`);
    }

    // Cập nhật ID của các Brand còn lại
    // await this.brandRepository.query(
    //   `UPDATE "brand" SET "id"= "id"-1 WHERE "id"> $1`,
    //   [id],
    // );
    // await this.brandRepository.query(
    //   `ALTER SEQUENCE brand_id_seq RESTART WITH(SELECT MAX(id)+1 FROM "brand");`,
    // );
    return {
      message: `Brand with ID ${brandId} has been successfully removed`,
    };
  }
}
