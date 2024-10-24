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
import { insertCartMock } from './../../cart/__mocks__/insert-cart.mock';
import { CartProductMock } from '../__mocks__/cart-product.mock';
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
            findOne: jest.fn().mockReturnValue(CartProductMock),
            save: jest.fn().mockReturnValue(CartProductMock),
            findProductById: jest.fn().mockReturnValue(productMock),
            delete: jest.fn().mockReturnValue(deleteMock),
          },
        },
        {
          provide: getRepositoryToken(CartProductEntity),
          useValue: {
            findOne: jest.fn().mockReturnValue(CartProductMock),
            save: jest.fn().mockReturnValue(CartProductMock), 
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
    jest.spyOn(cartProductRepository, 'delete').mockRejectedValue(new Error());
    await expect(
      service.deleteProductCart(productMock.id, cartMock.id),
    ).rejects.toThrow(Error);
  });

  it('should return CartProduct after create', async () => {
    const productCart = await service.createProduct(
      insertCartMock,
      cartMock.id,
    );
    expect(productCart).toStrictEqual(CartProductMock);
  });

  it('should return error in exception create', async () => {
    jest.spyOn(cartProductRepository, 'save').mockRejectedValue(new Error());
    await expect(
      service.createProduct(insertCartMock, cartMock.id),
    ).rejects.toThrow(Error);
  });

  it('should return CartProduct if exist', async () => {
    const productCart = await service.verifyProductInCart(
      productMock.id,
      cartMock.id,
    );
    expect(productCart).toStrictEqual(CartProductMock);
  });

  it('should throw NotFoundException if product not found', async () => {
    jest.spyOn(cartProductRepository, 'findOne')
      .mockResolvedValue(undefined);

    await expect(service.verifyProductInCart(productMock.id, cartMock.id))
      .rejects.toThrow(NotFoundException);
  });

  it('should return error in exception verifyProductInCart', async () => {
    jest.spyOn(cartProductRepository, 'findOne')
      .mockRejectedValue(new Error()); 

    await expect(
      service.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrow(Error);
  });
});
