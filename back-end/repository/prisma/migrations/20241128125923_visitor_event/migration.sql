-- CreateTable
CREATE TABLE "VisitorEvent" (
    "id" SERIAL NOT NULL,
    "visitorId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "VisitorEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VisitorEvent_visitorId_eventId_key" ON "VisitorEvent"("visitorId", "eventId");

-- AddForeignKey
ALTER TABLE "VisitorEvent" ADD CONSTRAINT "VisitorEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitorEvent" ADD CONSTRAINT "VisitorEvent_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "Visitor"("visitorId") ON DELETE RESTRICT ON UPDATE CASCADE;
