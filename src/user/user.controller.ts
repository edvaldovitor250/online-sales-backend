/* eslint-disable prettier/prettier */

import { Controller, Post, Body, Patch, Get, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDTO } from './dtos/returnUser.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserId } from 'src/decorators/user-id-decorator';
import { UserType } from './enum/user-type.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UsePipes(ValidationPipe)
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers(): Promise<ReturnUserDTO[]> {
    const users: UserEntity[] = await this.userService.getAllUsers();
    return users.map(user => new ReturnUserDTO(user));
  }

  @Get('/:userId')
  async getUserByIdUsingRelations(@Param('userId') userId: number): Promise<ReturnUserDTO> {
    return new ReturnUserDTO(await this.userService.getUserByIdUsingRelations(userId));
  }

  @Roles(UserType.ADMIN, UserType.USER)
  @Patch()
  @UsePipes(ValidationPipe)
  async updatePasswordUser(@Body() updatePasswordDTO: UpdatePasswordDto,@UserId() userId: number,
  ): Promise<UserEntity> {
    return this.userService.updatePasswordUser(updatePasswordDTO, userId);
  }

}
