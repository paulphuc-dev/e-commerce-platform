import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1756313259612 implements MigrationInterface {
    name = ' $npmConfigName1756313259612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("username" nvarchar(255) NOT NULL, "modified_at" datetime NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_bebc9158e480b949565b4dc7a82" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "description" text NOT NULL, "stock" int NOT NULL CONSTRAINT "DF_84fcd7d6abd6b5ae40d35368941" DEFAULT 0, "unit_price" decimal NOT NULL, "is_active" bit NOT NULL CONSTRAINT "DF_a433eeca0a34c58b5ac80a6a088" DEFAULT 1, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
