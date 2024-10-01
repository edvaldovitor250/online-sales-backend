/* eslint-disable prettier/prettier */
import { Controller, Param, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';

@Controller('address')
export class AddressController {

    constructor(private readonly addressService: AddressService) { }

    @Post('/:userId')
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body() createAddressDto: CreateAddressDto,
        @Param('userId') userId: number,
    ): Promise<AddressEntity> {
        return this.addressService.createAddress(createAddressDto, userId);
    }
}
