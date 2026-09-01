-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('DEFAULT', 'LIGHT', 'DARK');

-- CreateTable
CREATE TABLE "Settings" (
    "userId" INTEGER NOT NULL,
    "theme" "Theme" NOT NULL DEFAULT 'DEFAULT',

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_userId_key" ON "Settings"("userId");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
