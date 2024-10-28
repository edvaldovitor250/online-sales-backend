/* eslint-disable prettier/prettier */
import { Column } from "typeorm";
import { ChildEntity } from "typeorm/decorator/entity/ChildEntity";
import { PaymentEntity } from "./payment.entity";
import { CreateOrderDto } from "src/order/dtos/create-order.dto";

@ChildEntity()
export class PaymentCreditCardEntity extends PaymentEntity {
  
  @Column({ name: 'amount_payments', nullable: false })
  amountPayments: number;

  constructor(
    statusId: number,
    price: number,
    discount: number,
    finalPrice: number,
    createOrderDTO: CreateOrderDto,
  ) {
    super(statusId, price, discount, finalPrice);
    this.amountPayments = createOrderDTO?.amountPayments || 0;
  }

}