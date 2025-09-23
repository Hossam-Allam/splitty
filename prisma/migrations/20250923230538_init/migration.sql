-- CreateTable
CREATE TABLE "Bill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "total" REAL DEFAULT 0,
    "isSettled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "billId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "displayName" TEXT,
    "joinedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Participant_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "billId" INTEGER NOT NULL,
    "orderedByParticipantId" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Item_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_orderedByParticipantId_fkey" FOREIGN KEY ("orderedByParticipantId") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Bill_code_key" ON "Bill"("code");

-- CreateIndex
CREATE INDEX "Participant_userId_idx" ON "Participant"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_billId_userId_key" ON "Participant"("billId", "userId");
