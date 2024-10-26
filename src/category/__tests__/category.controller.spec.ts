/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';
import { categoryMock } from '../__mocks__/category.mock';
import { createCategoryMock } from '../__mocks__/create-category.mock';

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CategoryService,
          useValue: {
            findAllCategories: jest.fn().mockResolvedValue([categoryMock]), // Corrigido para retornar uma lista de categorias
            createCategory: jest.fn().mockResolvedValue(categoryMock),
          },
        },
      ],
      controllers: [CategoryController],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(CategoryService).toBeDefined();
  });

  it('should return category Entity in findAllCategories', async () => {
    const categories = await controller.findAllCategories();

    expect(categories).toStrictEqual([
      {
        id: categoryMock.id,
        name: categoryMock.name,
      },
    ]);
  });

  it('should return category Entity in createCategory', async () => {
    const category = await controller.createCategory(createCategoryMock);

    expect(category).toStrictEqual(categoryMock);
  });
});
