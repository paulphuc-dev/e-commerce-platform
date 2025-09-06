import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1756313111813 implements MigrationInterface {
    name = ' $npmConfigName1756313111813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment" ("username" nvarchar(255) NOT NULL, "paid_at" datetime NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_fcaec7df5adf9cac408c686b2ab" DEFAULT NEWSEQUENTIALID(), "order_id" nvarchar(255) NOT NULL, "amount" decimal NOT NULL, "method" nvarchar(255) NOT NULL, "status" nvarchar(255) NOT NULL CONSTRAINT "DF_3af0086da18f32ac05a52e56390" DEFAULT 'success', CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "payment"`);
    }

}
