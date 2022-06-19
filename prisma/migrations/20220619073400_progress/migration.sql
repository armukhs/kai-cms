-- AlterTable
ALTER TABLE "Progress" ADD COLUMN     "created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "KomentarProgress" (
    "id" TEXT NOT NULL,
    "rencanaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KomentarProgress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KomentarProgress" ADD CONSTRAINT "KomentarProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KomentarProgress" ADD CONSTRAINT "KomentarProgress_rencanaId_fkey" FOREIGN KEY ("rencanaId") REFERENCES "Rencana"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
