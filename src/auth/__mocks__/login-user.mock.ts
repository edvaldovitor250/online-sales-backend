/* eslint-disable prettier/prettier */
import { LoginDTO } from "../dtos/login.dto";
import { userEntityMocks } from "../../user/__mocks__/user.mock";

export const loginUserMock:LoginDTO = {
    email: userEntityMocks.email,
    password: "9090"
}