import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

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

  const password = process.env.DEFAULT_ADMIN_PASS;
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    //add default user
    const defaultUser = await prisma.user.upsert({
      create: {
        email: 'admin@rozedev.com',
        firstName: 'Admin',
        lastName: 'User',
        password: hashedPassword,
      },
      where: {
        email: 'admin@rozedev.com',
      },
      update: {},
    });

    console.log('defaultUser :>> ', defaultUser);
  } else {
    console.warn('Default admin pass is undefined ');
  }
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
