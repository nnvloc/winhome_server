import {MigrationInterface, QueryRunner} from "typeorm";

export class bookingsInitModel1658294976381 implements MigrationInterface {
    name = 'bookingsInitModel1658294976381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bookings" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer NOT NULL, "item_id" integer NOT NULL, "item_owner_id" integer NOT NULL, "item_price" integer NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "total_amount" integer NOT NULL, "amount" integer NOT NULL, "service_fee" integer NOT NULL DEFAULT '0', "tax" integer NOT NULL, "number_of_guests" integer, "status" integer NOT NULL DEFAULT '1', "note" character varying DEFAULT '', "description" character varying, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_64cd97487c5c42806458ab5520c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_851926a2be9f84f2bbe346d8539" FOREIGN KEY ("item_owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_08a1891eea2eb2ab36214d74997" FOREIGN KEY ("item_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_08a1891eea2eb2ab36214d74997"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_851926a2be9f84f2bbe346d8539"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_64cd97487c5c42806458ab5520c"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
    }

}
