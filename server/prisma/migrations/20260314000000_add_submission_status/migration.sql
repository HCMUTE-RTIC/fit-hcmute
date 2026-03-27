-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "form_submissions" ADD COLUMN "status" "SubmissionStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE INDEX "form_submissions_status_idx" ON "form_submissions"("status");
