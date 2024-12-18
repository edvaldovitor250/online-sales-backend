/* eslint-disable prettier/prettier */
import { AddressEntity } from "../../address/entities/address.entity";
import { OrderProductEntity } from "../../order-product/entities/order-product.entity";
import { PaymentEntity } from "../../payment/entities/payment.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Entity } from "typeorm";

@Entity({ name: 'order' })
export class OrderEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id', nullable: false })
    userId: number;
  
    @Column({ name: 'address_id', nullable: false })
    addressId: number;
  
    @Column({ name: 'date', nullable: false })
    date: Date;
  
    @Column({ name: 'payment_id', nullable: false })
    paymentId: number;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToMany(() => UserEntity, (user) => user.orders)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user?: UserEntity;
  
    @ManyToMany(() => AddressEntity, (address) => address.orders)
    @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
    address?: AddressEntity;
  
    @ManyToMany(() => PaymentEntity, (payment) => payment.orders)
    @JoinColumn({ name: 'payment_id', referencedColumnName: 'id' })
    payment?: PaymentEntity;
  
    @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order)
    ordersProduct?: OrderProductEntity[];
}