-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "login_tries" INTEGER NOT NULL DEFAULT 0;
