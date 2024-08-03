import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdatePantryPlaceAreaType1708249456039 implements MigrationInterface {
  name = 'UpdatePantryPlaceAreaType1708249456039'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "PantryPlaces" ADD "areaFloat" double precision`)
    await queryRunner.query(`UPDATE "PantryPlaces" SET "areaFloat" = "area"`)
    await queryRunner.query(
      `ALTER TABLE "PantryPlaces" ALTER COLUMN "areaFloat" SET NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "PantryPlaces" DROP COLUMN "area"`)
    await queryRunner.query(
      `ALTER TABLE "PantryPlaces" RENAME COLUMN "areaFloat" TO "area"`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "PantryPlaces" ADD "areaInteger" integer`)
    await queryRunner.query(`UPDATE "PantryPlaces" SET "areaInteger" = floor("area")`)
    await queryRunner.query(
      `ALTER TABLE "PantryPlaces" ALTER COLUMN "areaInteger" SET NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "PantryPlaces" DROP COLUMN "area"`)
    await queryRunner.query(
      `ALTER TABLE "PantryPlaces" RENAME COLUMN "areaInteger" TO "area"`,
    )
  }
}
