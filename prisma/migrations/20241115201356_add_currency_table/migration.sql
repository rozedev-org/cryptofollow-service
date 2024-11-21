/*
  Warnings:

  - You are about to drop the column `currency` on the `Investment` table. All the data in the column will be lost.
  - You are about to drop the column `trading_pair` on the `Investment` table. All the data in the column will be lost.
  - Added the required column `currency_id` to the `Investment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Investment" DROP COLUMN "currency",
DROP COLUMN "trading_pair",
ADD COLUMN     "currency_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pair" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Currency_name_key" ON "Currency"("name");

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
