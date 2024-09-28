/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AddressModule } from "./address/address.module";
import { CityModule } from "./city/city.module";
import { StateModule } from "./state/state.module";
import { UserModule } from "./user/user.module";
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    UserModule,
    CityModule,
    StateModule,
    AddressModule,
    CacheModule,
  ],
  exports: [
    UserModule,
    CityModule,
    StateModule,
    AddressModule,
    CacheModule
  ],
})
export class ModuleGlobal  {}
