-- CreateTable
CREATE TABLE "PlayerMatches" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "matchesId" INTEGER NOT NULL,

    CONSTRAINT "PlayerMatches_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayerMatches_playerId_matchesId_key" ON "PlayerMatches"("playerId", "matchesId");

-- AddForeignKey
ALTER TABLE "PlayerMatches" ADD CONSTRAINT "PlayerMatches_matchesId_fkey" FOREIGN KEY ("matchesId") REFERENCES "Matches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMatches" ADD CONSTRAINT "PlayerMatches_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;
