/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AddressModule } from "./address/address.module";
import { CityModule } from "./city/city.module";
import { StateModule } from "./state/state.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    UserModule,
    CityModule,
    StateModule,
    AddressModule,
  ],
  exports: [
    UserModule,
    CityModule,
    StateModule,
    AddressModule,
  ],
})
export class ModuleGlobal  {}
