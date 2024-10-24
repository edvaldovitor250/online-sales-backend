/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CartEntity } from './entities/cart.entities';
import { InsertCartDto } from './dtos/insert-cart.dto';
import { CartService } from './cart.service';
import { UserId } from 'src/decorators/user-id-decorator';
import { ReturnCartDto } from './dtos/return-cart.dto';
import { DeleteResult } from 'typeorm';

@Roles(UserType.USER)
@Controller('cart')
export class CartController {

    constructor(
        private readonly cartService: CartService
    ){}

    @Get()
    async getProductInCart(): Promise<CartEntity[]>{
      return await this.cartService.getProductInCart();
    }

  
  @UsePipes(ValidationPipe) 
  @Post()
  async createCart(@Body() insertCart: InsertCartDto,@UserId() userId: number): Promise<ReturnCartDto> {
    return  new ReturnCartDto(await this.cartService.insertProductInCart(insertCart, userId))
  }

  @Get()
  async findCartByUserId(userId: number): Promise<ReturnCartDto> {
    return new ReturnCartDto(await this.cartService.findCartByUserId(userId,true))
  }

  @Delete()
  async clearCart(@UserId() userId: number):Promise<DeleteResult>{
    return this.cartService.clearCart(userId);
  }

}
