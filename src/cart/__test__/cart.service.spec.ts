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
            insertProductInCart: jest.fn().mockResolvedValue(undefined),
            deleteProductCart: jest.fn().mockResolvedValue(deleteMock),
            updateProductInCart: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: getRepositoryToken(CartEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(cartMock),
            findOne: jest.fn().mockResolvedValue(cartMock), 
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
    const spy = jest.spyOn(cartRepository, 'save');

    const resultDelete = await service.clearCart(userEntityMocks.id);

    expect(resultDelete).toStrictEqual(ReturnDeleteMock);
    expect(spy.mock.calls[0] [0]).toStrictEqual({
      ...cartMock,
      active: false,
    });
  });
});
