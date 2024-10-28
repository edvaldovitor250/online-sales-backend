/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {

    constructor(
        private readonly orderService: OrderService
    ) {}

    @Post('/cart/:cartId')
    @UsePipes(ValidationPipe)
    async createOrder(@Body() createOrderDto: CreateOrderDto,@Param('cartId') cartId: number
    ) {
        return await this.orderService.createOrder(createOrderDto, cartId);
    }
}
