/* eslint-disable prettier/prettier */
import { IsNumber } from "class-validator";

export class UpdatetCartDto{
    
    @IsNumber()
    productId:number

    
    @IsNumber()
    amount:number;
}