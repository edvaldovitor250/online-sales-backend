/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { CacheService } from '../cache/cache.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly citiesRepository: Repository<CityEntity>,
    private readonly cacheService: CacheService,
  ) { }

  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    return this.cacheService.getCache<CityEntity[]>(
      `state/${stateId}`,
      () => this.citiesRepository.find({ where: { stateId } })
    );
  }

 

  async findCityById(cityId: number): Promise<CityEntity> {
    const city = await this.citiesRepository.findOne({ where: { id: cityId } });

    if (!city) {
      throw new NotFoundException(`City with id ${cityId} not found.`);
    }
    return city;
  }
}
