import {MigrationInterface, QueryRunner} from "typeorm";

export class createCalender31652430663388 implements MigrationInterface {
    name = 'createCalender31652430663388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "calender" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "person" varchar, "CDate" varchar)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "calender"`);
    }

}
