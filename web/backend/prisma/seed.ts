import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'; 

const prisma = new PrismaClient();

async function main() {
  let hashedPassword = await bcrypt.hash("20020904", 10);
  const akari = await prisma.user.upsert({
    where: { mainkey: 1 },
    update: {},
    create: {
      name: "akari",
      id:"akari0904",
      gender: "female",
      password:hashedPassword,
    },
  });
  hashedPassword = await bcrypt.hash("20030114", 10);
  const ryusei = await prisma.user.upsert({
    where: { mainkey: 2 },
    update: {},
    create: {
        name: "ryusei",
        id:"ryusei0114",
        gender: "male",
        password:hashedPassword,
    },
  });
  console.log({ akari, ryusei });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });