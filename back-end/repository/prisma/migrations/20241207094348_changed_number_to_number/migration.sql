/*
  Warnings:

  - Changed the type of `number` on the `Location` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "number",
ADD COLUMN     "number" INTEGER NOT NULL;
