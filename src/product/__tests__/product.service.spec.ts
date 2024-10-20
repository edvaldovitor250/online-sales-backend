/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../__mocks__/product.mock';
import { CategoryService } from '../../category/category.service';
import { categoryMock } from '../../category/__mocks__/category.mock';
import { ReturnDeleteMock } from '../__mocks__/return-delete.mock';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: CategoryService,
          useValue: {
            findCategoryById: jest.fn().mockResolvedValue(categoryMock),
          },
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            findOne: jest.fn().mockResolvedValue(productMock),
            save: jest.fn().mockResolvedValue(productMock),
            delete: jest.fn().mockResolvedValue(ReturnDeleteMock)
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
    categoryService = module.get<CategoryService>(CategoryService);
    productRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  it('should return all products', async () => {
    const products = await service.findAllProduct();
    expect(products).toStrictEqual([productMock]);
  });

  it('should return an error if products are empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValueOnce([]); 

    await expect(service.findAllProduct()).rejects.toThrowError();
  });

  it('should return an error on exceptions', async () => {
    jest.spyOn(productRepository, 'find').mockImplementationOnce(() => {
      throw new Error('Some error');
    });

    await expect(service.findAllProduct()).rejects.toThrowError('Some error');
  });

  it('should return product after insert in DB', async () => {

    jest.spyOn(productRepository,'save').mockResolvedValueOnce(productMock);

    const product = await service.createProduct(productMock);
    expect(product).toStrictEqual(productMock);
  });

  it('should return product in find by id', async () => {

    const product = await service.findProductById(productMock.id);
    
    expect(product).toStrictEqual(productMock);
  });

  it('should return product error not found product in find by id', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.findProductById(productMock.id)).rejects.toThrowError();
  });

  it('should return delete true in delete product', async () => {

    const deletedProduct = await service.deleteProduct(productMock.id);
    
    expect(deletedProduct).toStrictEqual(ReturnDeleteMock);
  });
  

});
