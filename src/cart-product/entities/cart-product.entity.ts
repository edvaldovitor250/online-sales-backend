/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProductEntity } from '../../product/entities/product.entity';
import { CartEntity } from '../../cart/entities/cart.entities';

@Entity({ name: 'cart_product' })
export class CartProductEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ name: 'cart_id', nullable: false })
  cartId: number;

  @Column({ name: 'product_id', nullable: false })
  productId: number;

  @Column({ name: 'amount', nullable: false })
  amount: number;

  @Column({ name: 'created_at' })
  createdAt: Date;
  
  @Column({ name: 'updated_at' })
  updatedAt: Date; 

  @ManyToOne(
    () => ProductEntity,
    (productEntity: ProductEntity) => productEntity.cartProducts,
  )
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: ProductEntity;

  @ManyToOne(
    () => CartEntity,
    (cartEntity: CartEntity) => cartEntity.cartProducts,
  )
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart?: CartEntity;
}
