/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertRootInUser1729374161281 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            INSERT INTO public."user"(
                name, email, cpf, type_user, phone, password)
                VALUES ('root', 'root@root.com', '12345678901', 2, '31925325252', '$2b$10$hb/fuM49Ev..MArDqR3j8OEXuanA59rBXTNXuXG0eh1jZuPV5Fcmq');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DELETE FROM public."user"
                WHERE email like 'root@root.com';
        `);
    }

}
