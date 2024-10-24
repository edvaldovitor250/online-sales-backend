/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CartProductService } from '../cart-product.service';
import { ProductService } from '../../product/product.service';
import { Repository } from 'typeorm';
import { CartProductEntity } from '../entities/cart-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../../product/__mocks__/product.mock';
import { cartMock } from '../__mocks__/cart.mock';
import { deleteMock } from './delete.mock';
import { NotFoundException } from '@nestjs/common';

describe('CartProductService', () => {
  let service: CartProductService;
  let productService: ProductService;
  let cartProductRepository: Repository<CartProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartProductService,
        {
          provide: ProductService,
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            findProductById: jest.fn().mockReturnValue(productMock),
            delete: jest.fn().mockReturnValue(deleteMock),
          },
        },
        {
          provide: getRepositoryToken(CartProductEntity),
          useValue: {
            findProductById: jest.fn().mockReturnValue(productMock),
            delete: jest.fn().mockReturnValue(deleteMock),
          },
        },
      ],
    }).compile();

    service = module.get<CartProductService>(CartProductService);
    productService = module.get<ProductService>(ProductService);
    cartProductRepository = module.get<Repository<CartProductEntity>>(getRepositoryToken(CartProductEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productService).toBeDefined();
    expect(cartProductRepository).toBeDefined();
  });

  it('should return Delete Result after deleting product', async () => {
    const result = await service.deleteProductCart(productMock.id, cartMock.id);
    expect(result).toStrictEqual(deleteMock);
  });

  it('should return error in exception delete', async () => {
    jest.spyOn(cartProductRepository, 'delete').mockRejectedValueOnce(new NotFoundException('Product not found'));

    try {
      await service.deleteProductCart(productMock.id, cartMock.id);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Product not found');
    }
  });
});
