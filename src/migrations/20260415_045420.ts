import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" ADD COLUMN "sku" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_sku" varchar;
  CREATE UNIQUE INDEX "products_sku_idx" ON "products" USING btree ("sku");
  CREATE INDEX "_products_v_version_version_sku_idx" ON "_products_v" USING btree ("version_sku");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "products_sku_idx";
  DROP INDEX "_products_v_version_version_sku_idx";
  ALTER TABLE "products" DROP COLUMN "sku";
  ALTER TABLE "_products_v" DROP COLUMN "version_sku";`)
}
