import {MigrationInterface, QueryRunner} from "typeorm";

export class updateRoomTable1657257863765 implements MigrationInterface {
    name = 'updateRoomTable1657257863765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "dob" SET DEFAULT '"2022-07-08T05:24:25.189Z"'`);
        await queryRunner.query(`ALTER TABLE "public"."room" DROP CONSTRAINT "FK_f4f2ee1b5d223a50dd25922773a"`);
        await queryRunner.query(`ALTER TABLE "public"."room" ALTER COLUMN "note" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."room" ALTER COLUMN "status" SET DEFAULT '4'`);
        await queryRunner.query(`ALTER TABLE "public"."room" ALTER COLUMN "lat" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."room" ALTER COLUMN "lng" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."room" ALTER COLUMN "category_id" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "public"."room" ADD CONSTRAINT "FK_f4f2ee1b5d223a50dd25922773a" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."room" DROP CONSTRAINT "FK_f4f2ee1b5d223a50dd25922773a"`);
        await queryRunner.query(`ALTER TABLE "public"."room" ALTER COLUMN "category_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "public"."room" ALTER COLUMN "lng" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."room" ALTER COLUMN "lat" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."room" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "public"."room" ALTER COLUMN "note" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."room" ADD CONSTRAINT "FK_f4f2ee1b5d223a50dd25922773a" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "dob" SET DEFAULT '2022-07-05 08:03:31.373'`);
    }
}
