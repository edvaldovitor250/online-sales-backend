/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { jest } from '@jest/globals';
import { CacheService } from '../../cache/cache.service';
import { AddressService } from '../address.service';
import { AddressMocks } from '../__mocks__/address.mock';
import { AddressEntity } from '../entities/address.entity';
import { userEntityMocks } from '../../user/__mocks__/user.mock';
import { cityMocks } from '../../city/__mocks__/city.mocks';
import { createAddressMocks } from '../__mocks__/create-address.mocks';
import { UserService } from './../../user/user.service';
import { CityService } from './../../city/city.service';

describe('AddressService', () => {
    let service: AddressService;
    let addressRepository: Repository<AddressEntity>;
    let userService:UserService;
    let cityService: CityService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AddressService,
                {
                    provide: UserService,
                    useValue: {
                        findUserById: jest.fn().mockReturnValue(userEntityMocks),
                    }

                },
                {
                    provide: CityService,
                    useValue: {
                        findCityById: jest.fn().mockReturnValue(cityMocks),
                    }

                },
                {
                    provide: getRepositoryToken(AddressEntity),
                    useValue: {
                        save: jest.fn().mockReturnValue(AddressMocks),
                    },
                },
                {
                    provide: CacheService,
                    useValue: {
                        getCache: jest.fn().mockReturnValue([AddressMocks])
                    }
                },
                {
                    provide: CacheService,
                    useValue: {
                        get: jest.fn(),
                        set: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AddressService>(AddressService);
        userService = module.get<UserService>(UserService);
        cityService = module.get<CityService>(CityService);
        addressRepository = module.get<Repository<AddressEntity>>(
            getRepositoryToken(AddressEntity),
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(cityService).toBeDefined();
        expect(addressRepository).toBeDefined();
        expect(userService).toBeDefined();
    });

    it('should return address after save', async () => {
        const address = await service.createAddress(createAddressMocks, userEntityMocks.id);
        expect(address).toStrictEqual(AddressMocks);
    });

    it('should return error if exception in userService', async () => {
        jest.spyOn(userService, 'findUserById').mockRejectedValueOnce(new Error());
      
        await expect(
          service.createAddress(createAddressMocks, userEntityMocks.id)
        ).rejects.toThrowError();
      });
      
      it('should return error if exception in cityService', async () => {
        jest.spyOn(cityService, 'findCityById').mockRejectedValueOnce(new Error());
      
        await expect(
          service.createAddress(createAddressMocks, userEntityMocks.id)
        ).rejects.toThrowError();
      });
      



    });

