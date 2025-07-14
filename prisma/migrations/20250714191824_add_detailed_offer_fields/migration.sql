-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "added_value_ideas" TEXT,
ADD COLUMN     "estimated_delivery" TIMESTAMP(3),
ADD COLUMN     "main_goal" TEXT,
ADD COLUMN     "potential_problems" TEXT,
ADD COLUMN     "preliminary_package" TEXT,
ADD COLUMN     "target_audience" TEXT;
