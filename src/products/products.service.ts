/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
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
    const { idCategory, idBrand, ...productDetails } = createProductDto;

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
    const brand = await this.brandRepository.findOne({
      where: { id: idBrand },
    });

    if (!brand) {
      throw new BadRequestException(`Brand with ID ${idBrand} does not exist`);
    }
    // Tạo sản phẩm
    const product = this.productResponsitory.create({
      ...productDetails,
      category, // Set the category as an object
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Lưu sản phẩm
    const savedProduct = await this.productResponsitory.save(product);

    return savedProduct;
  }
  async getAllProducts(): Promise<{ products: any[] }> {
    const products = await this.productResponsitory.find({
      relations: ['category', 'category.brand'], // Load the related data
    });
    console.log('Loaded products:', products); // Debugging log
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
    console.log('result :>> ', result);
    return { products: result };
  }
  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
function pickProductFields(product: Product): any {
  throw new Error('Function not implemented.');
}
