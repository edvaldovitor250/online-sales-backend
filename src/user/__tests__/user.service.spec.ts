/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMocks } from '../__mocks__/user.mock';
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

  it('should return user in findUserByEmail',async () => {

    const user = await service.findUserByEmail(userEntityMocks.email)

    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return an error in findUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    await expect(service.findUserByEmail(userEntityMocks.email))
      .rejects
      .toThrowError();
  });

  it('should return user in findUserById',async () => {

    const user = await service.findUserById(userEntityMocks.id)

    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return an error in findUserById', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    await expect(service.findUserById(userEntityMocks.id))
      .rejects
      .toThrowError();
  });

  it('should return user in getUserByIdUsingRelations',async () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return error in findUserByEmail (error DB )', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
    expect(service.findUserByEmail(userEntityMocks.email)).rejects.toThrow();
  });

  it('should return error in findUserById (error DB )', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
    expect(service.findUserById(userEntityMocks.id)).rejects.toThrow();
  });


  it('should return error if user exists', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(userEntityMocks);
  
    await expect(service.createUser(userEntityMocks))
      .rejects
      .toThrowError('User with this email already exists');
  });

  it('should create and return user if user does not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
    jest.spyOn(userRepository, 'save').mockResolvedValue(userEntityMocks);
  
    const user = await service.createUser(userEntityMocks);
  
    expect(user).toStrictEqual(userEntityMocks);

  });
 





});
