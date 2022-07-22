import {MigrationInterface, QueryRunner} from "typeorm";

export class invoiceInitModel1658475068876 implements MigrationInterface {
    name = 'invoiceInitModel1658475068876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invoices" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer NOT NULL, "item_id" integer NOT NULL, "item_owner_id" integer NOT NULL, "booking_id" integer NOT NULL, "item_price" integer NOT NULL, "total_amount" integer NOT NULL, "amount" integer NOT NULL, "service_fee" integer NOT NULL DEFAULT '0', "tax" integer NOT NULL DEFAULT '0', "status" integer NOT NULL DEFAULT '1', "note" character varying DEFAULT '', CONSTRAINT "REL_ed9c7aa7846704bbcb648377e8" UNIQUE ("booking_id"), CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."bookings" DROP COLUMN "item_price"`);
        await queryRunner.query(`ALTER TABLE "public"."bookings" DROP COLUMN "total_amount"`);
        await queryRunner.query(`ALTER TABLE "public"."bookings" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "public"."bookings" DROP COLUMN "service_fee"`);
        await queryRunner.query(`ALTER TABLE "public"."bookings" DROP COLUMN "tax"`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_26daf5e433d6fb88ee32ce93637" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_4a1cd76b1d915b473eb35fb8f47" FOREIGN KEY ("item_owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_6f481e6e6a8f186e5ec000d8bb7" FOREIGN KEY ("item_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_ed9c7aa7846704bbcb648377e8f" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_ed9c7aa7846704bbcb648377e8f"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_6f481e6e6a8f186e5ec000d8bb7"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_4a1cd76b1d915b473eb35fb8f47"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_26daf5e433d6fb88ee32ce93637"`);
        await queryRunner.query(`ALTER TABLE "public"."bookings" ADD "tax" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."bookings" ADD "service_fee" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "public"."bookings" ADD "amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."bookings" ADD "total_amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."bookings" ADD "item_price" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "invoices"`);
    }

}
