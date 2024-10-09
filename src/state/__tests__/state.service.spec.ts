/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { jest } from '@jest/globals'; 
import { StateEntity } from '../entities/state.entity';
import { StateService } from '../state.service';
import { stateEntityMocks } from '../__mocks__/state.mocks';

describe('StateService', () => {
  let service: StateService;
  let stateRepository: Repository<StateEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: getRepositoryToken(StateEntity),
          useValue: {
            find: jest.fn().mockReturnValue([stateEntityMocks]),
          },
        },
      ],
    }).compile();

    service = module.get<StateService>(StateService);
    stateRepository = module.get<Repository<StateEntity>>(
      getRepositoryToken(StateEntity),
    );
  });

  it(('should be defined'), () => {
    expect(service).toBeDefined();
    expect(stateRepository).toBeDefined();
  });

  it(('should return list of states'),  async () => {
    const state = await service.getAllState();

    expect(state).toStrictEqual([stateEntityMocks]);
  });

  it(('should return erro in exceptions'),  async () => {
    jest.spyOn(stateRepository, 'find').mockRejectedValueOnce(new Error());

    expect(service.getAllState()).rejects.toThrowError();
    
    const state = await service.getAllState();

    expect(state).toStrictEqual([stateEntityMocks]);
  });



});
