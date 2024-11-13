-- AlterTable
ALTER TABLE "Matches" ALTER COLUMN "hour" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "_EventToVisitor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToMatches" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventToVisitor_AB_unique" ON "_EventToVisitor"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToVisitor_B_index" ON "_EventToVisitor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToMatches_AB_unique" ON "_EventToMatches"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToMatches_B_index" ON "_EventToMatches"("B");

-- AddForeignKey
ALTER TABLE "_EventToVisitor" ADD CONSTRAINT "_EventToVisitor_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToVisitor" ADD CONSTRAINT "_EventToVisitor_B_fkey" FOREIGN KEY ("B") REFERENCES "Visitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToMatches" ADD CONSTRAINT "_EventToMatches_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToMatches" ADD CONSTRAINT "_EventToMatches_B_fkey" FOREIGN KEY ("B") REFERENCES "Matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
