/* eslint-disable prettier/prettier */
import { userEntityMocks } from "../../user/__mocks__/user.mock";
import { CartEntity } from "../../cart/entities/cart.entities";

export const cartMock:CartEntity = {
    id: 0,
    userId: userEntityMocks.id,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
}