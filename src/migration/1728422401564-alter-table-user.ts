/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUser1728422401564 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`alter table public.user add unique (email)`);    
    }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(``);
    }

}
