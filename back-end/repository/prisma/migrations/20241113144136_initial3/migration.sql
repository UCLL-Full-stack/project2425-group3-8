/*
  Warnings:

  - You are about to drop the `_EventToMatches` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventId` to the `Matches` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_EventToMatches" DROP CONSTRAINT "_EventToMatches_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToMatches" DROP CONSTRAINT "_EventToMatches_B_fkey";

-- AlterTable
ALTER TABLE "Matches" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_EventToMatches";

-- AddForeignKey
ALTER TABLE "Matches" ADD CONSTRAINT "Matches_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
