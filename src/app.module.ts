/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity'
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { StateEntity } from './state/entities/state.entity';
import { migrationsGlobal } from './migration/migrationsGlobal';
import { CityEntity } from './city/entities/city.entity';
import { entitiesGlobal } from './entitiesGlobal';

@Module({
  imports: [
  ConfigModule.forRoot({
      envFilePath: '.env.development.local', 
    }),
    TypeOrmModule.forRoot({ 
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '909012345',
  database: process.env.DB_DATABASE || 'sales-online',
  entities: entitiesGlobal,
  migrations: migrationsGlobal,
  migrationsRun:true,
  synchronize: false,
  logging: true,
    }),
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
