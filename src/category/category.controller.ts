/* eslint-disable prettier/prettier */
import { Body,  Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReturnCategoryDto } from './dtos/return-category.dto';
import { CategoryService } from './category.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDTO } from './dtos/create-category.dto';

@Roles(UserType.USER, UserType.ADMIN)
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    async findAllCategories(): Promise<ReturnCategoryDto[]> {
      return (await this.categoryService.findAllCategories()).map(
        (category) => new ReturnCategoryDto(category),
      );
    }
    @Roles(UserType.ADMIN)
    @UsePipes(ValidationPipe)
    @Post()
    async createCategory(
      @Body() createCategory: CreateCategoryDTO,
    ): Promise<CategoryEntity> {
      return this.categoryService.createCategory(createCategory);
    }
    

}
