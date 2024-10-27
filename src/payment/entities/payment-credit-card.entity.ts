/* eslint-disable prettier/prettier */
import { Column } from "typeorm";
import { ChildEntity } from "typeorm/decorator/entity/ChildEntity";
import { PaymentEntity } from "./payment.entity";

@ChildEntity()
export class PaymentCreditCardEntity extends PaymentEntity {
  
    @Column({ name: 'amount_payments', nullable: false })
  amountPayments: number;

}