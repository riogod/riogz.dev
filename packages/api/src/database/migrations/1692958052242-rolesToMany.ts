import { MigrationInterface, QueryRunner } from "typeorm";

export class RolesToMany1692958052242 implements MigrationInterface {
    name = 'RolesToMany1692958052242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`CREATE TABLE "user_role_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_8f1a6e129f057889ccddcb4b533" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_26736dfb41d6a47ce5d8365aad" ON "user_role_role" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8188039e9fdf7572245e2ed8a8" ON "user_role_role" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "user_role_role" ADD CONSTRAINT "FK_26736dfb41d6a47ce5d8365aad7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_role_role" ADD CONSTRAINT "FK_8188039e9fdf7572245e2ed8a83" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_role_role" DROP CONSTRAINT "FK_8188039e9fdf7572245e2ed8a83"`);
        await queryRunner.query(`ALTER TABLE "user_role_role" DROP CONSTRAINT "FK_26736dfb41d6a47ce5d8365aad7"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "roleId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8188039e9fdf7572245e2ed8a8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_26736dfb41d6a47ce5d8365aad"`);
        await queryRunner.query(`DROP TABLE "user_role_role"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
