import {MigrationInterface, QueryRunner} from "typeorm";

export class userUniquePhoneNumber1657694252275 implements MigrationInterface {
    name = 'userUniquePhoneNumber1657694252275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "phone_number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "UQ_01eea41349b6c9275aec646eee0" UNIQUE ("phone_number")`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "phone_number" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "phone_number" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "UQ_01eea41349b6c9275aec646eee0"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "phone_number" SET NOT NULL`);
    }

}
