import {MigrationInterface, QueryRunner} from "typeorm";

export class roomAseetsUpdateTypeAndStatus1657533031315 implements MigrationInterface {
    name = 'roomAseetsUpdateTypeAndStatus1657533031315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."room_assets" ALTER COLUMN "type" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "public"."room_assets" ALTER COLUMN "status" SET DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."room_assets" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "public"."room_assets" ALTER COLUMN "type" DROP DEFAULT`);
    }

}
