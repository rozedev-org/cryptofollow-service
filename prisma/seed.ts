import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  //Add BONK currency
  const bonkCurrency = await prisma.currency.upsert({
    create: {
      name: 'BONK',
      pair: 'USDT',
      price: 0.0000442,
    },
    where: {
      name: 'BONK',
    },
    update: {},
  });

  console.log('bonkCurrency :>> ', bonkCurrency);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
