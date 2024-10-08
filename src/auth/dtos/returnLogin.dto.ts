/* eslint-disable prettier/prettier */
import { ReturnUserDTO } from "../../user/dtos/returnUser.dto";

export interface ReturnLogin{
    user: ReturnUserDTO;
    accessToken:string;
}