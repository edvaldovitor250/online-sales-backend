/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals';
import { userEntityMocks} from '../../user/__mocks__/user.mock';
import { UserService } from './../../user/user.service';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { jtwMocks } from '../__mocks__/jtw.mocks';
import { loginUserMock } from '../__mocks__/login-user.mock';
import { NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn().mockReturnValue(userEntityMocks),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => jtwMocks,
          },
        },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user if password and email is correct', async () => {
    await expect(service.login(userEntityMocks)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return user if password invalid and email valid', async () => {
    expect(
      service.login({ ...loginUserMock, password: '4324' }),
    ).rejects.toThrow();
  });

  it('should return user if email not exist', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(undefined);

    expect(service.login(loginUserMock)).rejects.toThrow();
  });

  it('should return error in UserService', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockRejectedValue(new Error());

    expect(service.login(loginUserMock)).rejects.toThrow();
  });
});