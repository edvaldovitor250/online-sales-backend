/* eslint-disable prettier/prettier */
import { ProductEntity } from './../entities/product.entity';

export class ReturnProduct {
    
    readonly id: number;
    readonly name: string;
    readonly price: number;
    readonly image: string;


    constructor(productEntity: ProductEntity){
      
    this.id = productEntity.id;
    this.name = productEntity.name || ''; 
    this.price = productEntity.price !== undefined ? productEntity.price : 0;
    this.image = productEntity.image || '';
    }
}