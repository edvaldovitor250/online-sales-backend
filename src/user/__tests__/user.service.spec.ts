/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMocks } from '../__mocks__/user.mock';
import { createUserMock } from '../__mocks__/createUser.mock'; // Adicione a importação do mock de criação
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { jest } from '@jest/globals'; 

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn().mockReturnValue(userEntityMocks),
            save: jest.fn().mockReturnValue(userEntityMocks),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in findUserByEmail', async () => {
    const user = await service.findUserByEmail(userEntityMocks.email);
    expect(user).toStrictEqual(userEntityMocks);
  });

  it('should return an error in findUserByEmail when user does not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
    await expect(service.findUserByEmail(userEntityMocks.email))
      .rejects
      .toThrow(NotFoundException);
  });

  it('should return user in findUserById', async () => {
    const user = await service.findUserById(userEntityMocks.id);
    expect(user).toStrictEqual(userEntityMocks);
  });

  it('should return an error in findUserById when user does not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
    await expect(service.findUserById(userEntityMocks.id))
      .rejects
      .toThrow(NotFoundException);
  });

  it('should return user in getUserByIdUsingRelations', async () => {
    const user = await service.getUserByIdUsingRelations(userEntityMocks.id);
    expect(user).toStrictEqual(userEntityMocks);
  });

  it('should return error in getUserByIdUsingRelations when user does not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
    await expect(service.getUserByIdUsingRelations(userEntityMocks.id))
      .rejects
      .toThrow(Error);
  });

  it('should return error if user exists when creating user', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(userEntityMocks);
    await expect(service.createUser(createUserMock))
      .rejects
      .toThrow(BadRequestException);
  });

  it('should create and return user if user does not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
    jest.spyOn(userRepository, 'save').mockResolvedValue(userEntityMocks);

    const user = await service.createUser(createUserMock);
    expect(user).toStrictEqual(userEntityMocks);
  });

  it('should throw an error if there is a database error when creating user', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValue(new Error());
    await expect(service.createUser(createUserMock))
      .rejects
      .toThrow(Error);
  });
});
