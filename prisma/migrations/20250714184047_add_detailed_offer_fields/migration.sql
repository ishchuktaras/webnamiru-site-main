-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "price_items" JSONB,
ADD COLUMN     "price_total" DOUBLE PRECISION,
ADD COLUMN     "scope_items" JSONB,
ADD COLUMN     "scope_package" TEXT,
ADD COLUMN     "summary" TEXT;
