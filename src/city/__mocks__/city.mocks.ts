/* eslint-disable prettier/prettier */
import { stateEntityMocks } from "../../state/__mocks__/state.mocks";
import { CityEntity } from "../entities/city.entity";

export const cityMocks: CityEntity = {
    id: 1,
    name: "São Luiz",
    stateId: stateEntityMocks.id, 
    createdAt: new Date(),
    updatedAt: new Date(),
};
