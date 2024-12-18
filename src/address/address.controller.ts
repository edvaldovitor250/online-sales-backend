/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UsePipes, ValidationPipe, Get } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { UserId } from '../decorators/user-id-decorator';
import { ReturnAddressDto } from './dtos/returnAddress.dto';

@Roles(UserType.USER, UserType.ADMIN)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDto, userId);
  }

  @Get()
  async findAllAddressByUserId(@UserId() userId: number): Promise<ReturnAddressDto[]> {
    const addresses = await this.addressService.findAddressByUserId(userId);
    
    return addresses.map((address) => new ReturnAddressDto(address));
  }
}
