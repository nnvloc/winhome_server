import {MigrationInterface, QueryRunner} from "typeorm";

export class roomsAddPriorityAtColumn1659503030920 implements MigrationInterface {
    name = 'roomsAddPriorityAtColumn1659503030920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."room" ADD "priority_at" TIMESTAMP DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."room" DROP COLUMN "priority_at"`);
    }

}
