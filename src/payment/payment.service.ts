/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './../order/dtos/create-order.dto';
import { PaymentCreditCardEntity } from './entities/payment-credit-card.entity';
import { PaymentType } from 'src/user/enum/payment-type.enum';
import { PaymentPixEntity } from './entities/payment-pix.entity';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>
    ){}

    async createPayment(createOrderDto:CreateOrderDto):Promise<PaymentEntity>{
        if(createOrderDto.amountPayments){
            const paymentCreditCart = new PaymentCreditCardEntity(PaymentType.Done, 0 , 0, 0,createOrderDto);
            return this.paymentRepository.save(paymentCreditCart)

        } else if (createOrderDto.codePix && createOrderDto.datePayments){
            const paymentPix = new PaymentPixEntity(PaymentType.Done, 0 , 0, 0,createOrderDto);
            return this.paymentRepository.save(paymentPix)
        }

        throw new BadRequestException('Amount, payment code, or payment date not found');
    }
}
