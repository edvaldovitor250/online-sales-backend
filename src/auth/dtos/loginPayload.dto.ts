import { UserEntity } from 'src/user/entities/user.entity';

/* eslint-disable prettier/prettier */
export class LoginPayload{
    id: number;
    typeUser:number;

    constructor(user: UserEntity){
        this.id = user.id;
        this.typeUser = user.type_user;
    }
}