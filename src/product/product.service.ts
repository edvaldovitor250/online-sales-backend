/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        private readonly categoryService: CategoryService
    ) {
        
    }

    async findAllProduct(): Promise<ProductEntity[]> {
       const product = await this.productRepository.find();

       if(!product || product.length == 0){
            throw new NotFoundException('No products found');
       }

       return product;
    }

    async createProduct(createProduct: CreateProductDto): Promise<ProductEntity>{
        await this.categoryService.findCategoryById(createProduct.categoryId)
        
        return this.productRepository.save({
            ...createProduct,
        })
        
    }

}
