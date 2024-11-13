-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "playerId" INTEGER NOT NULL,
    "addressid" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_playerId_key" ON "Player"("playerId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_addressid_fkey" FOREIGN KEY ("addressid") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
