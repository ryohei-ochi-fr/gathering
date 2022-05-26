const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialSchema1653549619135 {
    name = 'initialSchema1653549619135'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "calender" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "person" varchar, "CDate" varchar)`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "calender"`);
    }
}
