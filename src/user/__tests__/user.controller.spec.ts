/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserController } from '../user.controller';
import { userEntityMocks } from '../__mocks__/user.mock';
import { createUserMock } from '../__mocks__/createUser.mock';
import { updatePasswordMock } from '../__mocks__/update-user.mock';

describe('UserController', () => {
  let controller: UserController;
  let service:UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(userEntityMocks),
            updatePasswordUser: jest.fn().mockResolvedValue(userEntityMocks),
            getUserByUsingRelations: jest
              .fn()
              .mockResolvedValue(userEntityMocks),
            getAllUsers: jest.fn().mockResolvedValue([userEntityMocks]),
          },
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  it('should return user Entity in createUser', async () => {
    const user = await controller.createUser(createUserMock)
    expect(user).toStrictEqual([
      {
        id: userEntityMocks.id,
        name: userEntityMocks.name,
        email: userEntityMocks.email,
        phone: userEntityMocks.phone,
        cpf: userEntityMocks.cpf,
      },
    ]);
  })

  it('should return ReturnUser in getUserById', async () => {
    const user = await controller.getUserByIdUsingRelations(userEntityMocks.id);

    expect(user).toStrictEqual({
      id: userEntityMocks.id,
      name: userEntityMocks.name,
      email: userEntityMocks.email,
      phone: userEntityMocks.phone,
      cpf: userEntityMocks.cpf,
    });
  });

  it('should return UserEntity in updatePasswordUser', async () => {
    const user = await controller.updatePasswordUser(
      updatePasswordMock,
      userEntityMocks.id,
    );

    expect(user).toStrictEqual(userEntityMocks);
  });
 
  });


 

