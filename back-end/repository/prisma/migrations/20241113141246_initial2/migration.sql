-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "adminId" INTEGER NOT NULL,
    "addressid" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitor" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "visitorId" INTEGER NOT NULL,
    "addressid" INTEGER NOT NULL,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Matches" (
    "id" SERIAL NOT NULL,
    "winner" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hour" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Matches_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_adminId_key" ON "Admin"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_addressid_key" ON "Admin"("addressid");

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_visitorId_key" ON "Visitor"("visitorId");

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_addressid_key" ON "Visitor"("addressid");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_addressid_fkey" FOREIGN KEY ("addressid") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_addressid_fkey" FOREIGN KEY ("addressid") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
