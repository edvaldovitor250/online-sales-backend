/* eslint-disable prettier/prettier */
import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMocks: UserEntity = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    cpf: '12345678901',
    password: 'password123',
    type_user: UserType.USER,
    createdAt: new Date(),
    updatedAt: new Date(),
    addresses: [],
};
