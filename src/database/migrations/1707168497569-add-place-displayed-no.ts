import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPlaceDisplayedNo1707168497569 implements MigrationInterface {
    name = 'AddPlaceDisplayedNo1707168497569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ParkingPlaces" ADD "displayedNo" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "PantryPlaces" ADD "displayedNo" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PantryPlaces" DROP COLUMN "displayedNo"`);
        await queryRunner.query(`ALTER TABLE "ParkingPlaces" DROP COLUMN "displayedNo"`);
    }

}
