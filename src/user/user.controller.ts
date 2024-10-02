/* eslint-disable prettier/prettier */

import { Controller, Post, Body, Get, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUser } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers(): Promise<ReturnUser[]> {
    const users: UserEntity[] = await this.userService.getAllUsers();
    return users.map(user => new ReturnUser(user));
  }

  @Get('/:userId')
  async getUserByIdUsingRelations(@Param('userId') userId: number): Promise<ReturnUser> {
    return new ReturnUser(await this.userService.getUserByIdUsingRelations(userId));
  }
}
