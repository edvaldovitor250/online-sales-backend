import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService){}

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDTO);
  }

  @Get()
  async getAllUser(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
  

}
