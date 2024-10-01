/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { UserEntity } from './../entities/user.entity';

export class ReturnUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    cpf: string;


    constructor(userEntity: UserEntity) {
        this.id = userEntity.id;
        this.name = userEntity.name;
        this.email = userEntity.email;
        this.phone = userEntity.phone;
        this.cpf = userEntity.cpf;
    }
}
