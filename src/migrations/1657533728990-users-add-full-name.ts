import {MigrationInterface, QueryRunner} from "typeorm";

export class usersAddFullName1657533728990 implements MigrationInterface {
    name = 'usersAddFullName1657533728990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "full_name" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "dob" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "dob" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "dob" SET DEFAULT '2022-07-08 11:05:57.136'`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "dob" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "full_name"`);
    }

}
