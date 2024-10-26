/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { StateController } from '../state.controller';
import { StateService } from '../state.service';
import { stateEntityMocks } from '../__mocks__/state.mocks';

describe('StateController', () => {
  let controller: StateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: StateService,
          useValue: {
            getAllState: jest.fn().mockResolvedValue(stateEntityMocks),
          }
        }

      ],

      controllers: [StateController],
    }).compile();

    controller = module.get<StateController>(StateController);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return full states', async () => {
    const state = await controller.getAllState();
    expect(state).toStrictEqual([stateEntityMocks]);
  })
 

});
