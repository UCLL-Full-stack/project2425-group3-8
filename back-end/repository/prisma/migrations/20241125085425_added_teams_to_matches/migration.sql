-- AlterTable
ALTER TABLE "Matches" ADD COLUMN     "team1" TEXT,
ADD COLUMN     "team2" TEXT,
ALTER COLUMN "winner" DROP NOT NULL,
ALTER COLUMN "result" DROP NOT NULL;
