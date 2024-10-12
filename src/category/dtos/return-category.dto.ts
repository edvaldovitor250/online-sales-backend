/* eslint-disable prettier/prettier */
import { CategoryEntity } from 'src/category/entities/category.entity';
export class ReturnCategoryDto {
    id: number;
    name:string;

    constructor(categoryEntity:CategoryEntity) {
        this.id = categoryEntity.id;
        this.name = categoryEntity.name;
        
    }
    
}