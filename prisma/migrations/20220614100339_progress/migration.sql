-- CreateTable
CREATE TABLE "Progress" (
    "id" TEXT NOT NULL,
    "rencanaId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "progress" TEXT NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_rencanaId_fkey" FOREIGN KEY ("rencanaId") REFERENCES "Rencana"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
