-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_locationid_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_sportid_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "sportid" DROP NOT NULL,
ALTER COLUMN "locationid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_sportid_fkey" FOREIGN KEY ("sportid") REFERENCES "Sport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_locationid_fkey" FOREIGN KEY ("locationid") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
