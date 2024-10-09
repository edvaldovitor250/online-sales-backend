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
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityMocks]), 
          },
        },
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cityMocks), 
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(getRepositoryToken(CityEntity));
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
    jest.spyOn(cityRepository, 'findOne').mockResolvedValueOnce(undefined);
    await expect(service.findCityById(cityMocks.id)).rejects.toThrowError(); 
  });

  it('should return all cities by state id', async () => {
    const cities = await service.getAllCitiesByStateId(cityMocks.stateId);
    expect(cities).toStrictEqual([cityMocks]);
  });
  
});
