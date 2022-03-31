import { MigrationInterface, QueryRunner } from "typeorm";

export class DesafioComplementar1648558609712 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "genres" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_genres_id" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total" numeric(6,2) NOT NULL, "usersId" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_orders_id" PRIMARY KEY ("id"))',
    );

    await queryRunner.query(
      'CREATE TABLE "genres_games_games" ("genresId" uuid NOT NULL, "gamesId" uuid NOT NULL, CONSTRAINT "PK_genres_games_games" PRIMARY KEY ("genresId", "gamesId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_genres_games_games_genresId" ON "genres_games_games" ("genresId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_genres_games_games_gamesId" ON "genres_games_games" ("gamesId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "genres_games_games" ADD CONSTRAINT "FK_genres_games_games_usersId" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "genres_games_games" ADD CONSTRAINT "FK_genres_games_games_gamesId" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );

    await queryRunner.query(
      'CREATE TABLE "orders_games_games" ("ordersId" uuid NOT NULL, "gamesId" uuid NOT NULL, CONSTRAINT "PK_orders_games_games" PRIMARY KEY ("ordersId", "gamesId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_orders_games_games_gamesId" ON "orders_games_games" ("gamesId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_orders_games_games_ordersId" ON "orders_games_games" ("ordersId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "orders_games_games" ADD CONSTRAINT "FK_orders_games_games_gamesId" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "orders_games_games" ADD CONSTRAINT "FK_orders_games_games_ordersId" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "genres_games_games" DROP CONSTRAINT "FK_genres_games_games_usersId"',
    );
    await queryRunner.query(
      'ALTER TABLE "genres_games_games" DROP CONSTRAINT "FK_genres_games_games_gamesId"',
    );
    await queryRunner.query(
      'ALTER TABLE "orders_games_games" DROP CONSTRAINT "FK_orders_games_games_gamesId"',
    );
    await queryRunner.query(
      'ALTER TABLE "orders_games_games" DROP CONSTRAINT "FK_orders_games_games_ordersId"',
    );
    await queryRunner.query('DROP INDEX "IDX_genres_games_games_genresId"');
    await queryRunner.query('DROP INDEX "IDX_genres_games_games_gamesId"');
    await queryRunner.query('DROP INDEX "IDX_orders_games_games_gamesId"');
    await queryRunner.query('DROP INDEX "IDX_orders_games_games_ordersId"');
    await queryRunner.query('DROP TABLE "genres_games_games"');
    await queryRunner.query('DROP TABLE "orders_games_games"');
    await queryRunner.query('DROP TABLE "genres"');
    await queryRunner.query('DROP TABLE "orders"');
  }

}
