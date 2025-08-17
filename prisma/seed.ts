import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Adarsh Tiwari - CEO
  const adarshPassword = await hash('Adarsh0704##', 12);
  const adarsh = await prisma.user.upsert({
    where: { email: 'tiwariadarsh908@gmail.com' },
    update: {},
    create: {
      email: 'tiwariadarsh908@gmail.com',
      passwordHash: adarshPassword,
      fullName: 'Adarsh Tiwari',
      roles: {
        create: [
          { role: 'CEO' }
        ]
      }
    },
  });

  // Vaibhav Mitra - R&D Head
  const vaibhavPassword = await hash('Vaibhav22##', 12);
  const vaibhav = await prisma.user.upsert({
    where: { email: 'mitravaibhav22@gmail.com' },
    update: {},
    create: {
      email: 'mitravaibhav22@gmail.com',
      passwordHash: vaibhavPassword,
      fullName: 'Vaibhav Mitra',
      roles: {
        create: [
          { role: 'RND_HEAD' }
        ]
      }
    },
  });

  // Yashwant Rao Alankara - Technical Head (CTO)
  const yashwantPassword = await hash('Yash55##', 12);
  const yashwant = await prisma.user.upsert({
    where: { email: 'yash55@gmail.com' },
    update: {},
    create: {
      email: 'yash55@gmail.com',
      passwordHash: yashwantPassword,
      fullName: 'Yashwant Rao Alankara',
      roles: {
        create: [
          { role: 'CTO' }
        ]
      }
    },
  });

  // Priyanshu Pandey - Marketing Head
  const priyanshuPassword = await hash('Priyanshu0902##', 12);
  const priyanshu = await prisma.user.upsert({
    where: { email: 'priyanshupandey0902@gmail.com' },
    update: {},
    create: {
      email: 'priyanshupandey0902@gmail.com',
      passwordHash: priyanshuPassword,
      fullName: 'Priyanshu Pandey',
      roles: {
        create: [
          { role: 'MARKETING_HEAD' }
        ]
      }
    },
  });

  console.log({ adarsh, vaibhav, yashwant, priyanshu });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });