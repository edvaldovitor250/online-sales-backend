/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ReturnAddressDto } from 'src/address/dtos/returnAddress.dto';
import { UserEntity } from './../entities/user.entity';

export class ReturnUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    addresses?: ReturnAddressDto[];


    constructor(user: UserEntity) {
        this.id = user?.id;
        this.name = user?.name;
        this.email = user?.email;
        this.phone = user.phone;
        this.cpf = user.cpf;
        this.addresses = user.addresses?.map(address => new ReturnAddressDto(address));
    }
}
