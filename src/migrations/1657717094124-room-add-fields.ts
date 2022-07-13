import {MigrationInterface, QueryRunner} from "typeorm";

export class roomAddFields1657717094124 implements MigrationInterface {
    name = 'roomAddFields1657717094124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."room" ADD "building" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "public"."room" ADD "unit_no" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "public"."room" ADD "floor" character varying DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."room" DROP COLUMN "floor"`);
        await queryRunner.query(`ALTER TABLE "public"."room" DROP COLUMN "unit_no"`);
        await queryRunner.query(`ALTER TABLE "public"."room" DROP COLUMN "building"`);
    }

}
