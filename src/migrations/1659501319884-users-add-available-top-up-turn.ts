import {MigrationInterface, QueryRunner} from "typeorm";

export class usersAddAvailableTopUpTurn1659501319884 implements MigrationInterface {
    name = 'usersAddAvailableTopUpTurn1659501319884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "available_top_up_turn" integer NOT NULL DEFAULT '10'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "available_top_up_turn"`);
    }

}
