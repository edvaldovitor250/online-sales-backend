/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from '../address.controller';
import { AddressService } from '../address.service';
import { createAddressMocks } from '../__mocks__/create-address.mocks';
import { userEntityMocks } from '../../user/__mocks__/user.mock';
import { AddressMocks } from '../__mocks__/address.mock';

describe('AddressController', () => {
  let controller: AddressController;
  let addressService: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AddressService,
          useValue: {
            createAddress: jest.fn().mockResolvedValue(AddressMocks),
            findAddressByUserId: jest.fn().mockResolvedValue([AddressMocks]),

          }
        }

      ],

      controllers: [AddressController],
    }).compile();

    controller = module.get<AddressController>(AddressController);
    addressService = module.get<AddressService>(AddressService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(addressService).toBeDefined();
  });

  it('should address Entity in createAddress', async () => {
    const address = await controller.createAddress(createAddressMocks, userEntityMocks.id)

    expect(address).toStrictEqual(AddressMocks);
  })

  it('should address Entity in createAddress', async () => {
    const address = await controller.findAllAddressByUserId(userEntityMocks.id)

    expect(address).toStrictEqual({
      complement: AddressMocks.complement,
      numberAddress: AddressMocks.numberAddress,
      cep: AddressMocks.cep
    });
  })

});
