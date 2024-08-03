import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPantryPlaces1706964156086 implements MigrationInterface {
    name = 'AddPantryPlaces1706964156086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "PantryPlaces" ("id" SERIAL NOT NULL, "floor" integer NOT NULL, "area" integer NOT NULL, "currentPrice" integer NOT NULL, "previousPrice" integer NOT NULL, "status" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_06ad4297e5b3ed720feb7c425e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "PantryPurchaseRequests" ("id" SERIAL NOT NULL, "customerName" character varying NOT NULL, "customerEmail" character varying NOT NULL, "customerPhoneNumber" character varying NOT NULL, "status" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "pantryPlaceId" integer, CONSTRAINT "PK_5f4546b78231776a1742f7bc2aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "PantryPurchaseRequests" ADD CONSTRAINT "FK_e31a8c20a97ba5e9875970c8665" FOREIGN KEY ("pantryPlaceId") REFERENCES "PantryPlaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PantryPurchaseRequests" DROP CONSTRAINT "FK_e31a8c20a97ba5e9875970c8665"`);
        await queryRunner.query(`DROP TABLE "PantryPurchaseRequests"`);
        await queryRunner.query(`DROP TABLE "PantryPlaces"`);
    }

}
