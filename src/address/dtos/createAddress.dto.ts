/* eslint-disable prettier/prettier */
import { IsInt, IsOptional, IsString } from "class-validator";

/* eslint-disable @typescript-eslint/no-empty-object-type */
export class CreateAddressDto {

  @IsString()
  @IsOptional()
  complement: string;

  @IsInt()
  numberAddress: number;

  @IsString()
  cep: string; 

  @IsInt()
  cityId: number; 
}
