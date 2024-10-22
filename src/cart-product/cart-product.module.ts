/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CartProductEntity } from './entities/cart-product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartProductEntity]), ProductModule],
  providers: [],
  exports: [],
})
export class CartProductModule {}