/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals'; 
import { CacheService } from '../cache.service';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'; 
import { userEntityMocks } from '../../user/__mocks__/user.mock';

describe('CacheService', () => {
  let service: CacheService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(), 
            set: jest.fn(), 
          },
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cacheManager).toBeDefined();
  });

  it('should return data from cache', async () => {
    jest.spyOn(cacheManager, 'get').mockResolvedValue(userEntityMocks);

    const user = await service.getCache('key', () => null);
    expect(user).toStrictEqual(userEntityMocks);
    expect(cacheManager.get).toHaveBeenCalledWith('key'); 
  });

  it('should return data from function and set cache', async () => {
    const result = { test: 'test' };
    jest.spyOn(cacheManager, 'get').mockResolvedValue(undefined); 
    jest.spyOn(cacheManager, 'set').mockResolvedValue(undefined); 

    const user = await service.getCache('key', () => Promise.resolve(result));
    expect(user).toStrictEqual(result);
    expect(cacheManager.set).toHaveBeenCalledWith('key', result); 
  });
});
