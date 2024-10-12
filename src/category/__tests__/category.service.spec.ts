/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { categoryMock } from '../__mocks__/category.mock';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useClass: Repository,
          useValue: {
            find: jest.fn().mockReturnValue([categoryMock]),
            save: jest.fn().mockReturnValue([categoryMock]),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(getRepositoryToken(CategoryEntity)); // Obtendo o repositório injetado corretamente
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  it('should throw an error when listing categories fails', async () => {
    jest.spyOn(categoryRepository, 'find').mockImplementation(() => {
      throw new Error('Error');
    });

    await expect(service.findAllCategories()).rejects.toThrowError('Error');
  });

  it('should throw an error when listing categories with exception', async () => {
    jest.spyOn(categoryRepository, 'find').mockImplementation(() => {
      throw new Error('Error');
    });

    await expect(service.findAllCategories()).rejects.toThrowError('Error');
  });
});
