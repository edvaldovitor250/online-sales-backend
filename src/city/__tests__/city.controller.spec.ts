/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from '../city.controller';
import { CityService } from '../city.service';
import { cityMocks } from '../__mocks__/city.mocks';

describe('CityController', () => {
  let controller: CityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CityService,
          useValue: {
            getAllCitiesByStateId: jest.fn().mockResolvedValue(cityMocks),

          }
        }

      ],

      controllers: [CityController],
    }).compile();

    controller = module.get<CityController>(CityController);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(CityService).toBeDefined();
  });

  it('should return city get all', async () => {
    const city = await controller.getAllCitiesByStateId(cityMocks.stateId)

    expect(city).toStrictEqual(cityMocks)
  })

});
