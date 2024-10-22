/* eslint-disable prettier/prettier */

import { AddressEntity } from "./address/entities/address.entity";
import { CartProductEntity } from "./cart-product/entities/cart-product.entity";
import { CartEntity } from "./cart/entities/cart.entities";
import { CategoryEntity } from "./category/entities/category.entity";
import { CityEntity } from "./city/entities/city.entity";
import { ProductEntity } from "./product/entities/product.entity";
import { StateEntity } from "./state/entities/state.entity";
import { UserEntity } from "./user/entities/user.entity";


export const entitiesGlobal = [
    UserEntity,
    StateEntity,
    CityEntity,
    AddressEntity,
    CategoryEntity,
    CartEntity,
    ProductEntity,
    CartProductEntity
];
