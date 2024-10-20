/* eslint-disable prettier/prettier */

import { ReturnStateDto } from "../../state/dtos/returnState.dto";
import { CityEntity } from "../entities/city.entity";

export class ReturnCityDto {
   readonly name: string;
   readonly state: ReturnStateDto;

    constructor(city: CityEntity) {
        this.name = city.name || '';
        this.state = city.state ? new ReturnStateDto(city.state) : undefined;

    }

}