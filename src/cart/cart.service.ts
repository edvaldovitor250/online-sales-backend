/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CartService {

    constructor(
        @InjectRepository(CartEntity)
        private readonly cardRepository: Repository<CartEntity>) { }



}
