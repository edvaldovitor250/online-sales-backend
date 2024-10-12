/* eslint-disable prettier/prettier */

import { AddressEntity } from "./address/entities/address.entity";
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
    ProductEntity
];
