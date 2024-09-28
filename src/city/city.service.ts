/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity) 
        private readonly citiesRepository: Repository<CityEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache 
    ) {}

    async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
        const cacheKey = `cities_state_${stateId}`;
        const citiesCache: CityEntity[] = await this.cacheManager.get(cacheKey);

        if (citiesCache) {
            return citiesCache;
        }

        const cities = await this.citiesRepository.find({ where: { stateId } });

        await this.cacheManager.set(cacheKey, cities);

        return cities;
    }
}
