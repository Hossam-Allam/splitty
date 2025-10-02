-- CreateTable
CREATE TABLE "public"."Bill" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "total" DOUBLE PRECISION DEFAULT 0,
    "isSettled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Participant" (
    "id" SERIAL NOT NULL,
    "billId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "displayName" TEXT,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "billId" INTEGER NOT NULL,
    "orderedByParticipantId" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bill_code_key" ON "public"."Bill"("code");

-- CreateIndex
CREATE INDEX "Participant_userId_idx" ON "public"."Participant"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_billId_userId_key" ON "public"."Participant"("billId", "userId");

-- AddForeignKey
ALTER TABLE "public"."Participant" ADD CONSTRAINT "Participant_billId_fkey" FOREIGN KEY ("billId") REFERENCES "public"."Bill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Item" ADD CONSTRAINT "Item_billId_fkey" FOREIGN KEY ("billId") REFERENCES "public"."Bill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Item" ADD CONSTRAINT "Item_orderedByParticipantId_fkey" FOREIGN KEY ("orderedByParticipantId") REFERENCES "public"."Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
