/* eslint-disable prettier/prettier */

import { AddressEntity } from "../entities/address.entity";

/* eslint-disable @typescript-eslint/no-empty-object-type */
export class ReturnAddressDto {

    complement:string;
    numberAddress: number;
    cep: string;

    constructor(address:AddressEntity) {
        this.complement = address.complement;
        this.numberAddress = address.numberAddress;
        this.cep = address.cep;
    }

}
