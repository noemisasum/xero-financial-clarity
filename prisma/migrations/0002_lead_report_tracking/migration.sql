-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "reportSendCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reportSentAt" TIMESTAMP(3);

