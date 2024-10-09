/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { jest } from '@jest/globals'; 
import { CityService } from '../city.service'; 
import { CityEntity } from '../entities/city.entity';
import { CacheService } from '../../cache/cache.service';
import { cityMocks } from '../__mocks__/city.mocks';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findOne: jest.fn().mockReturnValue(cityMocks),
            getAllCitiesByStateId: jest.fn().mockReturnValue([{}]),
          },
        },
        {
          provide:CacheService,
          useValue: {
            getCache:jest.fn().mockReturnValue([cityMocks])
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

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should return find city', async () => {
    const city = await service.findCityById(cityMocks.id);
    expect(city).toStrictEqual(cityMocks);
  });

  it('should return error find not found', async () => {
    jest.spyOn(cityRepository, 'findOne').mockReturnValue(undefined);
    expect(service.findCityById(cityMocks.id)).rejects.toThrowError();
  });

  it('should retunr a cached city', async () => {
    const city = await service.getAllCitiesByStateId(cityMocks.id);
    expect(city).toContainEqual(cityMocks);
  })

});
