import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1767371215284 implements MigrationInterface {
    name = 'Init1767371215284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id")); COMMENT ON COLUMN "profiles"."name" IS 'nombre del usuario'; COMMENT ON COLUMN "profiles"."last_name" IS 'apellido del usuario'`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(255) NOT NULL DEFAULT 'user', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "perfil_id" integer NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_8d16d3b029701db73376beff0c" UNIQUE ("perfil_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."email" IS 'correo electronico de la cuenta'; COMMENT ON COLUMN "users"."password" IS 'contraseña de la cuenta'; COMMENT ON COLUMN "users"."role" IS 'rol de la cuenta'`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8d16d3b029701db73376beff0c3" FOREIGN KEY ("perfil_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8d16d3b029701db73376beff0c3"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
    }

}
