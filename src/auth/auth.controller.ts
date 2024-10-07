/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { AuthService } from './auth.service'; 
import { ReturnLogin } from './dtos/returnLogin.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @UsePipes(ValidationPipe)
    @Post()
    async login(@Body() loginDto: LoginDTO): Promise<ReturnLogin> {
        return  this.authService.login(loginDto)
    }
}
