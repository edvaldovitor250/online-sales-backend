import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProductModule } from '../cart-product/cart-product.module';
import { CartEntity } from './entities/cart.entities';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity]), CartProductModule],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
// eslint-disable-next-line prettier/prettier
export class CartModule {}