/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../__mocks__/product.mock';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            save: jest.fn().mockResolvedValue(productMock), 
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
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
});
