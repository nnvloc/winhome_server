import {MigrationInterface, QueryRunner} from "typeorm";

export class initDb1656676398535 implements MigrationInterface {
    name = 'initDb1656676398535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "service" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "price" integer NOT NULL, "currency" character varying NOT NULL DEFAULT 'SGD', "isActive" boolean NOT NULL DEFAULT true, "categoryId" integer, CONSTRAINT "UQ_7806a14d42c3244064b4a1706ca" UNIQUE ("name"), CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "parentCategoryId" integer, "isDefault" boolean NOT NULL DEFAULT false, "imageUrl" character varying, "status" integer NOT NULL DEFAULT '1', CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item_entity" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_f8a329b22f66835df041692589d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "rooms" integer NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "setting" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "baseUrl" character varying NOT NULL, "note" character varying, "isActive" boolean NOT NULL DEFAULT true, "level" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_27923d152bbf82683ab795d5476" UNIQUE ("name"), CONSTRAINT "PK_fcb21187dc6094e24a48f677bed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "loginToken" character varying, "phoneCode" character varying NOT NULL DEFAULT '', "phoneNumber" character varying NOT NULL DEFAULT '', "dob" TIMESTAMP NOT NULL DEFAULT '"2022-07-01T11:53:20.890Z"', "isActive" boolean NOT NULL DEFAULT true, "role" character varying NOT NULL DEFAULT 'user', "resetCode" character varying, CONSTRAINT "UQ_ec55b7cde292156a1cf00fd130e" UNIQUE ("loginToken"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_cb169715cbb8c74f263ba192ca8" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_9e5435ba76dbc1f1a0705d4db43" FOREIGN KEY ("parentCategoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_9e5435ba76dbc1f1a0705d4db43"`);
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_cb169715cbb8c74f263ba192ca8"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "setting"`);
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TABLE "item_entity"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "service"`);
    }

}
