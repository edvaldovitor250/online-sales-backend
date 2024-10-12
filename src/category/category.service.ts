/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ) {}
    
    async findAllCategories() :Promise<CategoryEntity[]>  {
        const category = await this.categoryRepository.find();

        if(!category || category.length ==0){
            throw new NotFoundException('No categories found');
        }

        return category;
      
    }
}
