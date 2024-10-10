/* eslint-disable prettier/prettier */

import { AddressEntity } from "./address/entities/address.entity";
import { CityEntity } from "./city/entities/city.entity";
import { StateEntity } from "./state/entities/state.entity";
import { UserEntity } from "./user/entities/user.entity";


export const entitiesGlobal = [
    UserEntity,
    StateEntity,
    CityEntity,
    AddressEntity,
];
