/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { ReturnLoginMock } from '../__mocks__/return-login.mock';
import { loginUserMock } from '../__mocks__/login-user.mock';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue(ReturnLoginMock),
          }
        }

      ],

      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(AuthService).toBeDefined();
  });

  it('should return userLogin', async () => {
    const userLogin = await controller.login(loginUserMock);

    expect(userLogin).toStrictEqual(ReturnLoginMock);
  });


});
