/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDTO } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService
    ) { }

    async login(loginDto: LoginDTO): Promise<UserEntity> {

        const user: UserEntity | undefined = await this.userService.findUserByEmail(loginDto.email).catch(() => undefined);

        const isMatch = user ? await bcrypt.compare(loginDto.password, user.password) : false;

        if (!user || !isMatch) {
            throw new NotFoundException('Email or password invalid');

        }

        return user;
    }
}
