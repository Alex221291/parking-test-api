import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTelegramChatTable1702730241332 implements MigrationInterface {
    name = 'CreateTelegramChatTable1702730241332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TelegramChats" ("id" SERIAL NOT NULL, "chatId" BIGINT NOT NULL UNIQUE, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now())`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "TelegramChats"`);
    }

}
