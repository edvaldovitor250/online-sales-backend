import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [TypeOrmModule.forFeature([AddressEntity,UserEntity])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
