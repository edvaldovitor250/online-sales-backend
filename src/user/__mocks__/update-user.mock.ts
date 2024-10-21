/* eslint-disable prettier/prettier */
import { UpdatePasswordDto } from "../dtos/update-password.dto";

export const updatePasswordMock:UpdatePasswordDto = {
    newPassword: "324324",
    lastPassword: "1231"
}

export const updatePasswordInvalidMock:UpdatePasswordDto = {
    newPassword: "fsdf",
    lastPassword: "dsfds"
}