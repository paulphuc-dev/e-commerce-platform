import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1756313047866 implements MigrationInterface {
    name = ' $npmConfigName1756313047866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("username" nvarchar(255) NOT NULL, "modified_at" datetime NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_1031171c13130102495201e3e20" DEFAULT NEWSEQUENTIALID(), "total_amount" decimal NOT NULL, "status" nvarchar(255) NOT NULL CONSTRAINT "DF_7a9573d6a1fb982772a91233205" DEFAULT 'pending', "is_paid" bit NOT NULL CONSTRAINT "DF_6801891e4d15b8ff46cbf576230" DEFAULT 0, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_d01158fe15b1ead5c26fd7f4e90" DEFAULT NEWSEQUENTIALID(), "order_id" uniqueidentifier NOT NULL, "products_id" nvarchar(255) NOT NULL, "quantity" int NOT NULL, "unit_price" decimal NOT NULL, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_e9674a6053adbaa1057848cddfa" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_e9674a6053adbaa1057848cddfa"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
