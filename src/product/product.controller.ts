/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnProduct } from './dtos/return-product.dto';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult } from 'typeorm';

@Roles(UserType.ADMIN, UserType.USER)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAllProduct(): Promise<ReturnProduct[]> {
    const products = await this.productService.findAllProduct();
    return products.map((product) => new ReturnProduct(product));
  }

  @Roles(UserType.ADMIN)
  @UsePipes(ValidationPipe)
  @Post()
  async createProduct(@Body() createProduct: CreateProductDto): Promise<ProductEntity> {
    return this.productService.createProduct(createProduct);
  }

  @Roles(UserType.ADMIN)
  @Delete('/:productId')
  async deleteProduct(@Param('productId')productId: number): Promise<DeleteResult> {
    return this.productService.deleteProduct(productId);
  }
}
