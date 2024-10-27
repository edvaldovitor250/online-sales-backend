/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AddressModule } from './address/address.module';
import { CityModule } from './city/city.module';
import { StateModule } from './state/state.module';
import { UserModule } from './user/user.module';
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { CartProductModule } from './cart-product/cart-product.module';
import { PaymentStatusModule } from './payment-status/payment-status.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    UserModule,
    CityModule,
    StateModule,
    AddressModule,
    CacheModule,
    AuthModule,
    JwtModule,
    CategoryModule,
    ProductModule,
    CartModule,
    CartProductModule,
    PaymentStatusModule,
    PaymentModule,
  ],
  exports: [
    UserModule,
    CityModule,
    StateModule,
    AddressModule,
    CacheModule,
    AuthModule,
    JwtModule,
    CategoryModule,
    ProductModule,
    CartModule,
    CartProductModule,
    PaymentStatusModule,
    PaymentModule
  ],
})
export class ModuleGlobal {}
