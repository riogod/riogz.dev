import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeviceIdToSession1692905885637 implements MigrationInterface {
    name = 'AddDeviceIdToSession1692905885637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE "session"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "deviceId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "deviceId"`);
    }

}
