/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/interfaces/user.entity'
import { CreateTableUser1726620770841 } from './migration/1726620770841-create_table_user';
import { CreateTableCity1726667004482 } from './migration/1726667004482-create_table_city';
import { CreateTableState1726666964172 } from './migration/1726666964172-create_table_state';
import { CreateTableAddress1726667024256 } from './migration/1726667024256-create_table_address';


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
  entities: [UserEntity],
  migrations: [
    CreateTableUser1726620770841,
    CreateTableCity1726667004482,
    CreateTableState1726666964172,
    CreateTableAddress1726667024256,
  ],
  migrationsRun:true,
  synchronize: false,
  logging: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
