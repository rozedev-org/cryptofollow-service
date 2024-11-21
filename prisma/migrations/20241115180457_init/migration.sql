-- CreateTable
CREATE TABLE "Investment" (
    "id" SERIAL NOT NULL,
    "currency" TEXT NOT NULL,
    "trading_pair" TEXT NOT NULL,
    "buy_price" DOUBLE PRECISION NOT NULL,
    "currency_investment" DOUBLE PRECISION NOT NULL,
    "pair_investment" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "current_price" DOUBLE PRECISION NOT NULL,
    "pair_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "pair_variation" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "percentage_variation" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("id")
);
