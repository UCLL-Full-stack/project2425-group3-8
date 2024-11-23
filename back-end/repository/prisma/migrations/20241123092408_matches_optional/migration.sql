-- DropForeignKey
ALTER TABLE "Matches" DROP CONSTRAINT "Matches_eventId_fkey";

-- AlterTable
ALTER TABLE "Matches" ALTER COLUMN "eventId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Matches" ADD CONSTRAINT "Matches_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
