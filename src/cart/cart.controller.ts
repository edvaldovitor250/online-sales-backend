/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CartEntity } from './entities/cart.entities';
import { InsertCartDto } from './dtos/insert-cart.dto';
import { CartService } from './cart.service';
import { UserId } from 'src/decorators/user-id-decorator';

@Roles(UserType.USER)
@Controller('cart')
export class CartController {

    constructor(
        private readonly cartService: CartService
    ){}

  
  @UsePipes(ValidationPipe) 
  @Post()
  async createCart(@Body() insertCart: InsertCartDto,@UserId() userId: number): Promise<CartEntity> {
    return this.cartService.insertProductInCard(insertCart,userId);
  }
}
