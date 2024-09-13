/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto'; 
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    private users: User[] = [];
    private idCounter = 1;

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const passwordHashed = await bcrypt.hash(createUserDto.password, 10);
        const newUser: User = { ...createUserDto, password: passwordHashed, id: this.idCounter++ };
        this.users.push(newUser);
        return newUser;
    }

    getAllUsers(): User[] {
        return this.users;
    }
}
