/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDTO: CreateUserDto): Promise<UserEntity> {
    try {
      const saltOrRounds = 10;
      const passwordHashed = await bcrypt.hash(
        createUserDTO.password,
        saltOrRounds,
      );

      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDTO.email },
      });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      return this.userRepository.save({
        ...createUserDTO,
        typeUser: 1,
        password: passwordHashed,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Could not create user');
    }
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
        where: { id: userId }, 
    });
    if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
}

}
