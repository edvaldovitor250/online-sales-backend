/* eslint-disable prettier/prettier */


import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.userService.createUser(createUserDto);
  }

  @Get()
  getAllUsers(): User[] {
      return this.userService.getAllUsers();
  }
}