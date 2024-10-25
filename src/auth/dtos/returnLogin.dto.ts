/* eslint-disable prettier/prettier */
import { ReturnUserDTO } from "../../user/dtos/returnUser.dto";

export interface ReturnLogin{
    accessToken:string;
    user: ReturnUserDTO;
}