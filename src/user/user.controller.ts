/* eslint-disable prettier/prettier */


import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interfaces/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
      return this.userService.createUser(createUserDto);
  }

  @Get()
  getAllUsers(): Promise<UserEntity[]> {
      return this.userService.getAllUsers();
  }
}