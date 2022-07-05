import {MigrationInterface, QueryRunner} from "typeorm";

export class initDb1657008209594 implements MigrationInterface {
    name = 'initDb1657008209594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "firstName" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "login_token" character varying, "phone_code" character varying NOT NULL DEFAULT '', "phone_number" character varying NOT NULL DEFAULT '', "dob" TIMESTAMP NOT NULL DEFAULT '"2022-07-05T08:03:31.373Z"', "is_active" boolean NOT NULL DEFAULT true, "role" character varying NOT NULL DEFAULT 'user', "reset_code" character varying, CONSTRAINT "UQ_80deb7bb86e43ebd8ca992429e6" UNIQUE ("login_token"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "price" integer NOT NULL, "currency" character varying NOT NULL DEFAULT 'VND', "note" character varying NOT NULL, "rooms" integer NOT NULL, "address" character varying NOT NULL, "status" integer NOT NULL, "lat" integer NOT NULL, "lng" integer NOT NULL, "category_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "is_default" boolean NOT NULL DEFAULT false, "image_url" character varying, "status" integer NOT NULL DEFAULT '1', CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room_assets" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "room_id" integer NOT NULL, "url" character varying NOT NULL, "type" integer NOT NULL, "file_name" character varying NOT NULL, "file_size" integer NOT NULL, "file_extendsion" character varying NOT NULL, "status" integer NOT NULL, CONSTRAINT "PK_3d80470a7e85886687776c0b744" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "setting" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "base_url" character varying, "note" character varying, "is_active" boolean NOT NULL DEFAULT true, "level" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_27923d152bbf82683ab795d5476" UNIQUE ("name"), CONSTRAINT "PK_fcb21187dc6094e24a48f677bed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_f4f2ee1b5d223a50dd25922773a" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_4bae79e46b7d9395a7ebdf86423" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_assets" ADD CONSTRAINT "FK_1efe5a9c06ecc4473daa31a2c0b" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_assets" DROP CONSTRAINT "FK_1efe5a9c06ecc4473daa31a2c0b"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_4bae79e46b7d9395a7ebdf86423"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_f4f2ee1b5d223a50dd25922773a"`);
        await queryRunner.query(`DROP TABLE "setting"`);
        await queryRunner.query(`DROP TABLE "room_assets"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
