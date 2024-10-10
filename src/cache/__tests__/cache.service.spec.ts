/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals'; 
import { CacheService } from '../cache.service';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager'; // Certifique-se de importar corretamente
import { Cache } from 'cache-manager'; // A interface correta para Cache
import { userEntityMocks } from '../../user/__mocks__/user.mock';

describe('CacheService', () => {
  let service: CacheService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()], // Certifique-se de que o módulo Cache foi importado corretamente
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(), // Mock para o método get do cache
            set: jest.fn(), // Mock para o método set do cache
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
    expect(user).toStrictEqual(userEntityMocks); // Verifica se o valor do cache foi retornado
    expect(cacheManager.get).toHaveBeenCalledWith('key'); // Verifica se o cache foi acessado com a chave correta
  });

  it('should return data from function and set cache', async () => {
    const result = { test: 'test' };
    jest.spyOn(cacheManager, 'get').mockResolvedValue(undefined); // Simula cache vazio
    jest.spyOn(cacheManager, 'set').mockResolvedValue(undefined); // Simula sucesso ao setar no cache

    const user = await service.getCache('key', () => Promise.resolve(result));
    expect(user).toStrictEqual(result); // Verifica se o valor gerado pela função foi retornado
    expect(cacheManager.set).toHaveBeenCalledWith('key', result); // Verifica se o valor foi armazenado no cache
  });
});
