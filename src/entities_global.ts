/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { migrationsGlobal } from './migration/migrationsGlobal';
import { entitiesGlobal } from './entitiesGlobal';
import { ModuleGlobal } from './module_global.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/roles.guard';

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
      migrationsRun: true,
      synchronize: false,
      logging: true,
    }),
    ModuleGlobal,
  ],
  controllers: [],
  providers: [ 
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
