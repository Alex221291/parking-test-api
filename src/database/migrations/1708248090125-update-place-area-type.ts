import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdatePlaceAreaType1708248090125 implements MigrationInterface {
  name = 'UpdatePlaceAreaType1708248090125'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ParkingPlaces" ADD "areaFloat" double precision`,
    )
    await queryRunner.query(`UPDATE "ParkingPlaces" SET "areaFloat" = "area"`)
    await queryRunner.query(
      `ALTER TABLE "ParkingPlaces" ALTER COLUMN "areaFloat" SET NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "ParkingPlaces" DROP COLUMN "area"`)
    await queryRunner.query(
      `ALTER TABLE "ParkingPlaces" RENAME COLUMN "areaFloat" TO "area"`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ParkingPlaces" ADD "areaInteger" integer`)
    await queryRunner.query(`UPDATE "ParkingPlaces" SET "areaInteger" = floor("area")`)
    await queryRunner.query(
      `ALTER TABLE "ParkingPlaces" ALTER COLUMN "areaInteger" SET NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "ParkingPlaces" DROP COLUMN "area"`)
    await queryRunner.query(
      `ALTER TABLE "ParkingPlaces" RENAME COLUMN "areaInteger" TO "area"`,
    )
  }
}
