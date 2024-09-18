import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1726620770841 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE SEQUENCE public.user_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;
    `);

    await queryRunner.query(`
      CREATE TABLE public.user (
        id integer NOT NULL DEFAULT nextval('public.user_id_seq'),
        name character varying NOT NULL,
        email character varying NOT NULL,
        cpf character varying NOT NULL,
        type_user integer,
        phone character varying NOT NULL,
        password character varying NOT NULL,
        "created_at" TIMESTAMP without time zone DEFAULT now() NOT NULL,
        "updated_at" TIMESTAMP without time zone DEFAULT now() NOT NULL,
        PRIMARY KEY (id)
      );
    `);

    await queryRunner.query(`
      ALTER SEQUENCE public.user_id_seq
        OWNED BY public.user.id;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.user;
    `);

    await queryRunner.query(`
      DROP SEQUENCE public.user_id_seq;
    `);
  }
}
