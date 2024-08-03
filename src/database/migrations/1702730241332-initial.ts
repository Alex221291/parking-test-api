import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1702730241332 implements MigrationInterface {
    name = 'Initial1702730241332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "CallRequests" ("id" SERIAL NOT NULL, "customerName" character varying NOT NULL, "customerPhoneNumber" character varying NOT NULL, "status" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_faea26a0e49b9289ef4d95c9ff3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ParkingPlaces" ("id" SERIAL NOT NULL, "floor" integer NOT NULL, "type" integer NOT NULL, "area" integer NOT NULL, "currentPrice" integer NOT NULL, "previousPrice" integer NOT NULL, "status" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6219de9510782669bfbaa0c9206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Users_role_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "username" character varying(32) NOT NULL, "password" character varying(256) NOT NULL, "role" "public"."Users_role_enum" NOT NULL, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "PurchaseRequests" ("id" SERIAL NOT NULL, "customerName" character varying NOT NULL, "customerEmail" character varying NOT NULL, "customerPhoneNumber" character varying NOT NULL, "status" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "parkingPlaceId" integer, CONSTRAINT "PK_cf69df656bb00c0cf55d29a2d73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "PurchaseRequests" ADD CONSTRAINT "FK_90a8eaca6b86a317e7cbfc886d4" FOREIGN KEY ("parkingPlaceId") REFERENCES "ParkingPlaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PurchaseRequests" DROP CONSTRAINT "FK_90a8eaca6b86a317e7cbfc886d4"`);
        await queryRunner.query(`DROP TABLE "PurchaseRequests"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TYPE "public"."Users_role_enum"`);
        await queryRunner.query(`DROP TABLE "ParkingPlaces"`);
        await queryRunner.query(`DROP TABLE "CallRequests"`);
    }

}
