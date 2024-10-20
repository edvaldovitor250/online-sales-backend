/* eslint-disable prettier/prettier */

import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class UpdateProductDto {

    @IsString() 
    name:string;

    @IsNumber()
    @Type(() => Number)
    categoryId: number;
    
    @IsNumber()
    @Type(() => Number)
    price: number;

    @IsString() 
    image: string;

}