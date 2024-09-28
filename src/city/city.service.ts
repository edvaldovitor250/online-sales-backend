/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { CacheService } from '../cache/cache.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity) 
    private readonly citiesRepository: Repository<CityEntity>,
    private readonly cacheService: CacheService,
  ) {}

  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    return this.cacheService.getCache<CityEntity[]>(
      `state/${stateId}`, 
      () => this.citiesRepository.find({ where: { stateId } })
    );
  }
}
