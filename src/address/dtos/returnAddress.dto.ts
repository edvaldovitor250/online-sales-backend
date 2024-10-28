/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-interface */

import { ReturnCityDto } from "../../city/dtos/returnCity.dto";
import { AddressEntity } from "../entities/address.entity";

export class ReturnAddressDto {
  readonly id:number;
  readonly complement: string;
  readonly numberAddress: number;
  readonly cep: string;
  readonly city?: ReturnCityDto;

  constructor(address: AddressEntity) {
    const { id,complement, numberAddress, cep, city } = address;

    this.id = id;
    this.complement = complement;
    this.numberAddress = numberAddress;
    this.cep = cep;
    this.city = city ? new ReturnCityDto(city) : undefined;
  }
}
