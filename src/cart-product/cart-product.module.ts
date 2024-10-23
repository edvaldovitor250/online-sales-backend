/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CartProductEntity } from './entities/cart-product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';
import { CartProductService } from './cart-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartProductEntity]), ProductModule],
  providers: [CartProductService],
  exports: [CartProductService],
})
export class CartProductModule {}