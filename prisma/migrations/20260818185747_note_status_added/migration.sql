-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'ARCHIVE', 'BIN');

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';
