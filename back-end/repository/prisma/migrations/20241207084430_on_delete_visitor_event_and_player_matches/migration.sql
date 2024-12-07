-- DropForeignKey
ALTER TABLE "PlayerMatches" DROP CONSTRAINT "PlayerMatches_matchesId_fkey";

-- DropForeignKey
ALTER TABLE "VisitorEvent" DROP CONSTRAINT "VisitorEvent_eventId_fkey";

-- AddForeignKey
ALTER TABLE "PlayerMatches" ADD CONSTRAINT "PlayerMatches_matchesId_fkey" FOREIGN KEY ("matchesId") REFERENCES "Matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitorEvent" ADD CONSTRAINT "VisitorEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
