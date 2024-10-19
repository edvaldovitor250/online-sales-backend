/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) {
        
    }

    async findAllProduct(): Promise<ProductEntity[]> {
       const product = await this.productRepository.find();

       if(!product || product.length == 0){
            throw new NotFoundException('No products found');
       }

       return product;
    }

}
