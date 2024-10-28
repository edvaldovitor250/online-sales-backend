/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../order.service';
import { OrderController } from '../order.controller';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers:[
        {
          provide:OrderService,
          useValue:{
            createOrder:''
          }
        }
      ]
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(orderService).toBeDefined();
  });
});
