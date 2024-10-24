/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CartProductService } from '../cart-product.service';
import { ProductService } from '../../product/product.service';
import { Repository } from 'typeorm';
import { CartProductEntity } from '../entities/cart-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../../product/__mocks__/product.mock';
import { cartMock } from '../__mocks__/cart.mock';
import { deleteMock } from '../__mocks__/delete.mock';
import { insertCartMock } from './../../cart/__mocks__/insert-cart.mock';
import { CartProductMock } from '../__mocks__/cart-product.mock';
import { NotFoundException } from '@nestjs/common';
import { UpdateCartMock } from '../__mocks__/update-cart.mock';

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

  it('should return error in exception insertProducInCart', async () => {
    jest.spyOn(productService, 'findProductById')
      .mockRejectedValue(new NotFoundException()); 

    await expect(
      service.insertProductInCart(insertCartMock, cartMock),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return cart product if not exist cart', async () => {

    jest.spyOn(cartProductRepository, 'findOne')
      .mockResolvedValue(undefined); 

      const cartProduct = await service.insertProductInCart(insertCartMock, cartMock)

      expect(cartProduct).toStrictEqual(CartProductMock);
  });

  it('should return cart product if not exist cart', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');

    const cartProduct = await service.insertProductInCart(
      insertCartMock,
      cartMock,
    );

    expect(cartProduct).toStrictEqual(cartProduct);
    expect(spy.mock.calls[0][0]).toStrictEqual({
      ...cartProduct,
      amount: cartProduct.amount + insertCartMock.amount,
    });
  });

  it('should return error in exception updateProductInCart', async () => {
    jest
      .spyOn(productService, 'findProductById')
      .mockRejectedValue(new NotFoundException());

    expect(
      service.updateProductInCart(UpdateCartMock, cartMock),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return cart product if not exist cart (updateProductInCart)', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.updateProductInCart(UpdateCartMock, cartMock),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return cart product if not exist cart (updateProductInCart)', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');

    const cartProduct = await service.updateProductInCart(
      UpdateCartMock,
      cartMock,
    );

    expect(cartProduct).toStrictEqual(cartProduct);
    expect(spy.mock.calls[0][0].amount).toStrictEqual(UpdateCartMock.amount);
  });


});
