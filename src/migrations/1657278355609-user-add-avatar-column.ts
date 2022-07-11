import {MigrationInterface, QueryRunner} from "typeorm";

export class userAddAvatarColumn1657278355609 implements MigrationInterface {
    name = 'userAddAvatarColumn1657278355609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "avatar" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "dob" SET DEFAULT '"2022-07-08T11:05:57.136Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "dob" SET DEFAULT '2022-07-08 05:24:25.189'`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "avatar"`);
    }

}
