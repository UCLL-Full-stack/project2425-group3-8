/*
  Warnings:

  - You are about to drop the column `eventId` on the `Matches` table. All the data in the column will be lost.
  - You are about to drop the `_EventToVisitor` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[addressid]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sportid]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[locationid]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addressid]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addressid]` on the table `Visitor` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Matches" DROP CONSTRAINT "Matches_eventId_fkey";

-- DropForeignKey
ALTER TABLE "_EventToVisitor" DROP CONSTRAINT "_EventToVisitor_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToVisitor" DROP CONSTRAINT "_EventToVisitor_B_fkey";

-- AlterTable
ALTER TABLE "Matches" DROP COLUMN "eventId";

-- DropTable
DROP TABLE "_EventToVisitor";

-- CreateIndex
CREATE UNIQUE INDEX "Admin_addressid_key" ON "Admin"("addressid");

-- CreateIndex
CREATE UNIQUE INDEX "Event_sportid_key" ON "Event"("sportid");

-- CreateIndex
CREATE UNIQUE INDEX "Event_locationid_key" ON "Event"("locationid");

-- CreateIndex
CREATE UNIQUE INDEX "Player_addressid_key" ON "Player"("addressid");

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_addressid_key" ON "Visitor"("addressid");
