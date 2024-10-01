/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressEntity } from './entities/address.entity';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserService } from 'src/user/user.service'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
        private readonly userService: UserService, 
    ) {}

    async createAddress(createAddressDto: CreateAddressDto, userId: number): Promise<AddressEntity> {
        const userExists = await this.userService.findById(userId);
        if (!userExists) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const address = this.addressRepository.create({
            ...createAddressDto,
            userId,
        });

        return this.addressRepository.save(address);
    }
}
