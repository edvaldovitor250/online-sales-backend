/* eslint-disable prettier/prettier */
import { ProductEntity } from './../entities/product.entity';

export class ReturnProduct {
    
   readonly id:number;
    name:string;
    price:number;
    image:string;


    constructor(ProductEntity: ProductEntity){
        this.id = ProductEntity.id;
        this.name = ProductEntity.name;
        this.price = ProductEntity.price;
        this.image = ProductEntity.image;

    }
}