/* eslint-disable prettier/prettier */
import { CreateAddressDto } from "../dtos/createAddress.dto";
import { AddressMocks } from "./address.mock";

export const createAddressMocks:CreateAddressDto = {
    complement: AddressMocks.complement,
    numberAddress: AddressMocks.numberAddress,
    cep: AddressMocks.cep,
    cityId: AddressMocks.id, 
    
}