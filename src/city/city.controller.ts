/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { CityService } from './city.service';

@Controller('city')
export class CityController {

    constructor(private readonly cityService: CityService){}

    @Get('/:stateId')
    async getAllCitiesByStateId(@Param('stateId') stateId:number):Promise<CityEntity[]>{
        return this.cityService.getAllCitiesByStateId(stateId);
    }

    @Get('/find/:cityName')
    async findCityByName(@Param('cityName') cityName:string):Promise<CityEntity>{
        return this.cityService.findCityByName(cityName);
    }

  
}
