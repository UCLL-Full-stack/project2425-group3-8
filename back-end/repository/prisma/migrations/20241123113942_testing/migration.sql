/*
  Warnings:

  - Made the column `sportid` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `locationid` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_locationid_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_sportid_fkey";

-- DropIndex
DROP INDEX "Event_locationid_key";

-- DropIndex
DROP INDEX "Event_sportid_key";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "sportid" SET NOT NULL,
ALTER COLUMN "locationid" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_sportid_fkey" FOREIGN KEY ("sportid") REFERENCES "Sport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_locationid_fkey" FOREIGN KEY ("locationid") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
