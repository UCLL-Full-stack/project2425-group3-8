/*
  Warnings:

  - The primary key for the `Player` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Player` table. All the data in the column will be lost.
  - The primary key for the `Visitor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Visitor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Visitor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Visitor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Player_playerId_key";

-- DropIndex
DROP INDEX "Visitor_visitorId_key";

-- AlterTable
CREATE SEQUENCE player_playerid_seq;
ALTER TABLE "Player" DROP CONSTRAINT "Player_pkey",
DROP COLUMN "email",
DROP COLUMN "fullName",
DROP COLUMN "id",
DROP COLUMN "phoneNumber",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "playerId" SET DEFAULT nextval('player_playerid_seq'),
ADD CONSTRAINT "Player_pkey" PRIMARY KEY ("playerId");
ALTER SEQUENCE player_playerid_seq OWNED BY "Player"."playerId";

-- AlterTable
CREATE SEQUENCE visitor_visitorid_seq;
ALTER TABLE "Visitor" DROP CONSTRAINT "Visitor_pkey",
DROP COLUMN "email",
DROP COLUMN "fullName",
DROP COLUMN "id",
DROP COLUMN "phoneNumber",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "visitorId" SET DEFAULT nextval('visitor_visitorid_seq'),
ADD CONSTRAINT "Visitor_pkey" PRIMARY KEY ("visitorId");
ALTER SEQUENCE visitor_visitorid_seq OWNED BY "Visitor"."visitorId";

-- CreateIndex
CREATE UNIQUE INDEX "Player_userId_key" ON "Player"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_userId_key" ON "Visitor"("userId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
