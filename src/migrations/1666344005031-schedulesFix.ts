import { MigrationInterface, QueryRunner } from "typeorm";

export class schedulesFix1666344005031 implements MigrationInterface {
    name = 'schedulesFix1666344005031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ALTER COLUMN "date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ALTER COLUMN "hour" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ALTER COLUMN "hour" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ALTER COLUMN "date" SET DEFAULT now()`);
    }

}
