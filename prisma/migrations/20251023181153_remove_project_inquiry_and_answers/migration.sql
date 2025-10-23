/*
  Warnings:

  - You are about to drop the column `inquiryId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `InquiryAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectInquiry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InquiryAnswer" DROP CONSTRAINT "InquiryAnswer_inquiryId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_inquiryId_fkey";

-- DropIndex
DROP INDEX "Project_inquiryId_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "inquiryId";

-- DropTable
DROP TABLE "InquiryAnswer";

-- DropTable
DROP TABLE "ProjectInquiry";
