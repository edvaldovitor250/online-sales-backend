import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
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
}
