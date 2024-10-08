/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { Roles } from '..//decorators/roles.decorator';
import { UserType } from '..//user/enum/user-type.enum';
import { UserId } from '..//decorators/user-id-decorator';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Roles(UserType.USER)
    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body() createAddressDto: CreateAddressDto,
        @UserId() userId: number,
    ): Promise<AddressEntity> {
        return this.addressService.createAddress(createAddressDto, userId);
    }

    
}
