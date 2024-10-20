/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ReturnAddressDto } from '../../address/dtos/returnAddress.dto';
import { UserEntity } from '../entities/user.entity';

export class ReturnUserDTO {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly cpf: string;
    readonly addresses?: ReturnAddressDto[];


    constructor(user: UserEntity) {
        this.id = user?.id;
        this.name = user?.name;
        this.email = user?.email;
        this.phone = user.phone;
        this.cpf = user.cpf;
        this.addresses = user.addresses?.map(address => new ReturnAddressDto(address));
    }
}
