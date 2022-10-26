import { MigrationInterface, QueryRunner } from "typeorm";

export class isActiveSetDefaultTrue1666087075685 implements MigrationInterface {
    name = 'isActiveSetDefaultTrue1666087075685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" DROP DEFAULT`);
    }

}
