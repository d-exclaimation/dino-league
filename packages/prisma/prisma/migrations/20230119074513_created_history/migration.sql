-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "enemyId" TEXT,
    "isQuest" BOOLEAN NOT NULL DEFAULT false,
    "isWin" BOOLEAN NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);
