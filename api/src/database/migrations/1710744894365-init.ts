import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1710744894365 implements MigrationInterface {
  name = 'Init1710744894365';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "stories" ("id" integer NOT NULL, "title" character varying(255) NOT NULL, "url" character varying(255), "text" text, "author" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bb6f880b260ed96c452b32a39f0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "deleted_stories" ("id" SERIAL NOT NULL, "story_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_51944f55785eca26d3da415f59c" UNIQUE ("story_id"), CONSTRAINT "PK_996c439a9c86ef2049f221d4aca" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "deleted_stories"`);
    await queryRunner.query(`DROP TABLE "stories"`);
  }
}
