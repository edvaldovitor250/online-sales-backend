/* eslint-disable prettier/prettier */

import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class CartEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id', nullable: false })
    userId: number;
  
    @Column({ name: 'active', nullable: false })
    active: boolean;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}