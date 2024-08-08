/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'output/entities/Product';
import { Repository } from 'typeorm';
import { Brand } from 'output/entities/Brand';
import { Category } from 'output/entities/Category';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productResponsitory: Repository<Product>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { idCategory, ...productDetails } = createProductDto;

    // Kiểm tra danh mục
    const category = await this.categoryRepository.findOne({
      where: { id: idCategory },
      relations: ['brand'], // Ensure brand is loaded
    });

    if (!category) {
      throw new BadRequestException(
        `Category with ID ${idCategory} does not exist`,
      );
    }

    // Tạo sản phẩm
    const product = this.productResponsitory.create({
      ...productDetails,
      category, // Set the category as an object
      status:
        productDetails.status !== undefined ? productDetails.status : true, // Default to true if not provided
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Lưu sản phẩm
    const savedProduct = await this.productResponsitory.save(product);

    return savedProduct;
  }
  async getAllProducts(): Promise<{ products: any[] }> {
    const products = await this.productResponsitory.find({
      where: { status: true },
      relations: ['category', 'category.brand'], // Load the related data
    });
    const pickProductFields = (product: Product) => {
      const {
        id,
        name,
        descrption,
        price,
        quantity,
        status,
        cost,
        createdAt,
        updatedAt,
        event,
        discount,
        category,
      } = product;

      return {
        id,
        name,
        descrption,
        price,
        quantity,
        status,
        cost,
        createdAt,
        updatedAt,
        event,
        discount,
        category: category
          ? {
              id: category.id,
              name: category.name,
              status: category.status,
            }
          : null,
        brand: product.category?.brand
          ? {
              id: product.category.brand.id,
              name: product.category.brand.name,
              image: product.category.brand.image,
            }
          : null,
      };
    };

    const result = products.map(pickProductFields);

    return { products: result };
  }
  async findOne(id: number): Promise<Product> {
    const product = await this.productResponsitory.findOne({
      where: { id, status: true },
      relations: ['category', 'category.brand'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return {
      ...product,
      category: product.category
        ? {
            ...product.category,
          }
        : null,
    };
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { idCategory, ...productDetails } = updateProductDto;

    //Kiểm tra Product có tồn tại hay không?
    const product = await this.productResponsitory.findOne({
      where: { id, status: true },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    // Kiểm tra xem Category mới có tồn tại không
    if (idCategory) {
      const category = await this.categoryRepository.findOne({
        where: { id: idCategory },
      });
      if (!category) {
        throw new BadRequestException(
          `Category with ID ${idCategory} does not exist`,
        );
      }
      product.category = category;
    }
    //Cập nhật Product
    Object.assign(product, updateProductDto);

    return this.productResponsitory.save(product);
  }

  async deleteProduct(id: number): Promise<{ message: string }> {
    const product = await this.productResponsitory.findOne({
      where: { id, status: true },
      relations: ['category'],
    });
    if (!product) {
      throw new NotFoundException(`Product với ID ${id} không tìm thấy`);
    }
    const category = product.category;

    await this.productResponsitory.remove(product);

    if (category) {
      const productsInCategory = await this.productResponsitory.find({
        where: { category },
      });
      if (productsInCategory.length === 0) {
        await this.categoryRepository.remove(category);
      }
    }

    return { message: `Product với ID ${id} đã được xóa thành công` };
  }
}
