import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_locales" ADD COLUMN "medium" varchar;
  ALTER TABLE "_products_v_locales" ADD COLUMN "version_medium" varchar;
  ALTER TABLE "products" DROP COLUMN "medium";
  ALTER TABLE "_products_v" DROP COLUMN "version_medium";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" ADD COLUMN "medium" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_medium" varchar;
  ALTER TABLE "products_locales" DROP COLUMN "medium";
  ALTER TABLE "_products_v_locales" DROP COLUMN "version_medium";`)
}
