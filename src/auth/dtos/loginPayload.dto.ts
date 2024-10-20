/* eslint-disable prettier/prettier */
import { UserEntity } from '../../user/entities/user.entity';

export class LoginPayload{

   readonly id: number;

   readonly typeUser:number;

    constructor(user: UserEntity){
        this.id = user.id;
        this.typeUser = user.type_user;
    }
}