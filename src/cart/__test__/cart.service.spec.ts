/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../cart.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from '../entities/cart.entities';
import { CartProductService } from '../../cart-product/cart-product.service';
import { deleteMock } from '../../cart-product/__mocks__/delete.mock';
import { cartMock } from '../../cart-product/__mocks__/cart.mock';
import { userEntityMocks } from '../../user/__mocks__/user.mock';
import { ReturnDeleteMock } from '../../product/__mocks__/return-delete.mock';
import { NotFoundException } from '@nestjs/common';
import { insertCartMock } from '../__mocks__/insert-cart.mock';

describe('CartService', () => {
  let service: CartService;
  let cartRepository: Repository<CartEntity>;
  let cartProductService: CartProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: CartProductService,
          useValue: {
            insertProductInCart: jest.fn().mockResolvedValue(cartMock),
            deleteProductCart: jest.fn().mockResolvedValue(deleteMock),
            updateProductInCart: jest.fn().mockResolvedValue(cartMock),
          },
        },
        {
          provide: getRepositoryToken(CartEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(cartMock),
            findOne: jest.fn().mockResolvedValue(cartMock),
            create: jest.fn().mockReturnValue(cartMock), 
          },
        },
      ],
    }).compile();
    
    service = module.get<CartService>(CartService);
    cartRepository = module.get<Repository<CartEntity>>(getRepositoryToken(CartEntity));
    cartProductService = module.get<CartProductService>(CartProductService); 
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cartRepository).toBeDefined();
    expect(cartProductService).toBeDefined();
  });

  it('should return delete result if delete cart', async () => {
    jest.spyOn(cartRepository, 'save'); 

    const resultDelete = await service.clearCart(userEntityMocks.id);

    expect(resultDelete).toStrictEqual(ReturnDeleteMock);
    expect(cartRepository.save).toHaveBeenCalledWith({
      ...cartMock,
      active: false,
    });
  });

  it('should return error when findOne returns undefined', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

    await expect(service.clearCart(userEntityMocks.id)).rejects.toThrow(NotFoundException);
  });

  it('should return cart successfully without relations', async () => {
    const spy = jest.spyOn(cartRepository, 'findOne');
    const cart = await service.findCartByUserId(userEntityMocks.id);

    expect(cart).toStrictEqual(cartMock);
    expect(spy).toHaveBeenCalledWith({
      where: { userId: userEntityMocks.id, active: true },
      relations: undefined, 
    });
  });

  it('should return cart successfully with relations', async () => {
    const spy = jest.spyOn(cartRepository, 'findOne');
    const cart = await service.findCartByUserId(userEntityMocks.id, true);

    expect(cart).toStrictEqual(cartMock);
    expect(spy).toHaveBeenCalledWith({
      where: { userId: userEntityMocks.id, active: true },
      relations: {
        cartProducts: {
          product: true,
        },
      },
    });
  });

  it('should return NotFoundException when cart is not found', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
  
    await expect(service.findCartByUserId(userEntityMocks.id)).rejects.toThrow(NotFoundException);
  });

  it('should return cart in save (createCart)', async () => {
    const spy = jest.spyOn(cartRepository, 'save');

    const cart = await service.createCart(userEntityMocks.id);

    expect(cart).toBe(cartMock);
    expect(spy).toHaveBeenCalledWith({
      active: true,
      userId: userEntityMocks.id,
    });
  });

  it('should return cart not found info in save (insertProductInCart)', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
    const spySave = jest.spyOn(cartRepository, 'save');
    const spyCartProductService = jest.spyOn(cartProductService, 'insertProductInCart');

    const cart = await service.insertProductInCart(insertCartMock, userEntityMocks.id);

    expect(cart).toStrictEqual(cartMock);
    expect(spySave).toHaveBeenCalled();
    expect(spyCartProductService).toHaveBeenCalled();
  });

  it('should return cart found in save (insertProductInCart)', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(cartMock); 
    const spySave = jest.spyOn(cartRepository, 'save');
    const spyCartProductService = jest.spyOn(cartProductService, 'insertProductInCart');

    const cart = await service.insertProductInCart(insertCartMock, userEntityMocks.id);

    expect(cart).toStrictEqual(cartMock);
    expect(spySave).not.toHaveBeenCalled(); 
    expect(spyCartProductService).toHaveBeenCalled();
  });
});
