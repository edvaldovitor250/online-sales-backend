/* eslint-disable prettier/prettier */
import { cityMocks } from "../../city/__mocks__/city.mocks";
import { AddressEntity } from "../entities/address.entity";
import { userEntityMocks } from "../../user/__mocks__/user.mock";

export const AddressMocks:AddressEntity = {
    id: 1,
    complement: "A",
    numberAddress: 123,
    cep: "12345-678",
    cityId: cityMocks.id,
    user: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: userEntityMocks.id
}