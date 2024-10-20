/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-interface */

import { ReturnCityDto } from "../../city/dtos/returnCity.dto";
import { AddressEntity } from "../entities/address.entity";

export class ReturnAddressDto {
  readonly complement: string;
  readonly numberAddress: number;
  readonly cep: string;
  readonly city?: ReturnCityDto;

  constructor(address: AddressEntity) {
    const { complement, numberAddress, cep, city } = address;

    this.complement = complement;
    this.numberAddress = numberAddress;
    this.cep = cep;
    this.city = city ? new ReturnCityDto(city) : undefined;
  }
}
