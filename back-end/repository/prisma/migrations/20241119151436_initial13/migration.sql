/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Admin_adminId_key";

-- AlterTable
CREATE SEQUENCE admin_adminid_seq;
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
DROP COLUMN "email",
DROP COLUMN "fullName",
DROP COLUMN "id",
DROP COLUMN "password",
DROP COLUMN "phoneNumber",
ADD COLUMN     "userId" INTEGER,
ALTER COLUMN "adminId" SET DEFAULT nextval('admin_adminid_seq'),
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminId");
ALTER SEQUENCE admin_adminid_seq OWNED BY "Admin"."adminId";

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
