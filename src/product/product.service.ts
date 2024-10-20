/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { CategoryService } from '../category/category.service';

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

    async findProductById(productId: number): Promise<ProductEntity> {
        const product = await this.productRepository.findOne({ where: { id: productId } });
    
        if (!product) {
            throw new NotFoundException(`Product with ID ${productId} not found`);
        }
    
        return product;
    }
    
    async deleteProduct(productId: number): Promise<DeleteResult> {
        await this.findProductById(productId);
        
        return this.productRepository.delete(productId);
    }
    
}
