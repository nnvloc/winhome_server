import {MigrationInterface, QueryRunner} from "typeorm";

export class roomsAddDescriptionColumn1658070509444 implements MigrationInterface {
    name = 'roomsAddDescriptionColumn1658070509444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."room" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."room" ALTER COLUMN "floor" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."room" ALTER COLUMN "floor" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "public"."room" DROP COLUMN "description"`);
    }

}
