/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from '../cart.controller';
import { cartMock } from '../../cart-product/__mocks__/cart.mock';
import { insertCartMock } from '../__mocks__/insert-cart.mock';
import { userEntityMocks } from '../../user/__mocks__/user.mock';
import { CartService } from '../cart.service';
import { ReturnDeleteMock } from '../../product/__mocks__/return-delete.mock';
import { UpdateCartMock } from '../../cart-product/__mocks__/update-cart.mock';

describe('CartController', () => {
  let controller: CartController;
  let cartService: CartService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CartService,
          useValue: {
            insertProductInCart: jest.fn().mockResolvedValue(cartMock),
            findCartByUserId: jest.fn().mockResolvedValue(cartMock),
            clearCart: jest.fn().mockResolvedValue(ReturnDeleteMock),
            updateProductInCart: jest.fn().mockResolvedValue(cartMock),
          },
        },
      ],
      controllers: [CartController],
    }).compile();

    controller = module.get<CartController>(CartController);
    cartService = module.get<CartService>(CartService);
  });

   it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(cartService).toBeDefined();
  });

  it('should cart Entity in insertProductInCart', async () => {
    const cart = await controller.createCart(insertCartMock, userEntityMocks.id);

    expect(cart).toStrictEqual({
      id: cartMock.id,
    });
  });

  it('should cart Entity in insertProductInCart', async () => {
    const cart = await controller.findCartByUserId(userEntityMocks.id);

    expect(cart).toStrictEqual({
      id: cartMock.id,
    });
  });

  it('should return DeleteResult in clearCart', async () => {
    const cart = await controller.clearCart(userEntityMocks.id);

    expect(cart).toStrictEqual(ReturnDeleteMock);
  });

  it('should cart Entity in updateProductInCart', async () => {
    const cart = await controller.updateProductInCart(
      UpdateCartMock,
      userEntityMocks.id,
    );

    expect(cart).toStrictEqual({
      id: cartMock.id,
    });
  });
});
