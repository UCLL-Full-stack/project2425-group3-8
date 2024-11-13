/*
  Warnings:

  - Added the required column `eventId` to the `Matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Matches" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Matches" ADD CONSTRAINT "Matches_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
