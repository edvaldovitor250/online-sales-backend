import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class UserService {
    private users: User[] = [];

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const saltOrRounds = 10;  

        const passwordHashed = await bcrypt.hash(createUserDto.password, saltOrRounds);


        
        const newUser: User = {
            ...createUserDto,
            password: passwordHashed,
            id: this.users.length + 1,  
        };

        this.users.push(newUser); 
        return newUser;
    }

    async getAllUsers(): Promise<User[]> { 
        return this.users;
    }
}
