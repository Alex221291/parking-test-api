import { MigrationInterface, QueryRunner } from 'typeorm'

export class PostRefactoring1710191457231 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Blogs" ("id" SERIAL PRIMARY KEY,
    "title" CHARACTER VARYING(256) NOT NULL, 
    "description" CHARACTER VARYING(256),
    "imagePath" CHARACTER VARYING(256),
                             "createdAt" TIMESTAMP NOT NULL DEFAULT now()
    )`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "Blogs"`)
  }
}
