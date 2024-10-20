/* eslint-disable prettier/prettier */
import { StateEntity } from "../entities/state.entity";

export class ReturnStateDto{
    readonly name:string;

    constructor(state: StateEntity) {
        this.name = state.name || '' ;
    }
}