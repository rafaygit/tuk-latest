// import { PrismaClient } from '@prisma/client';
// import { hashSync } from 'bcrypt';

// const prisma = new PrismaClient();

// async function main() {
//   const passwordHash = hashSync('test123', 8);

//   const user1 = await prisma.users.upsert({
//     where: { id: 0 },
//     update: {},
//     create: {
//       email: 'rafay.abdul1111@gmail.com',
//       password: passwordHash,
//       firstName: 'Rafay',
//       role: 'USER',
//     },
//   });
//   const user2 = await prisma.users.upsert({
//     where: { id: 0 },
//     update: {},
//     create: {
//       email: 'no-reply22@tuk.dev',
//       password: passwordHash,
//       firstName: 'TUK',
//       role: 'ADMIN',
//     },
//   });

//   const license1 = await prisma.licenses.upsert({
//     where: { id: 0 },
//     update: {},
//     create: {
//       type: 'All-Star Bundle',
//       price: 500,
//       description: 'Bundle',
//     },
//     include: {
//       uiKits: true,
//     },
//   });

//   const license2 = await prisma.licenses.upsert({
//     where: { id: 0 },
//     update: {},
//     create: {
//       type: 'Team License',
//       price: 700,
//       description: 'Team Bundle',
//     },
//   });
//   const license3 = await prisma.licenses.upsert({
//     where: { id: 0 },
//     update: {},
//     create: {
//       type: 'Community License',
//       price: 0,
//       description: 'Free license',
//     },
//   });
//   const license4 = await prisma.licenses.upsert({
//     where: { id: 0 },
//     update: {},
//     create: {
//       type: 'Ecommerce UI Kit',
//       price: 100,
//       description: 'Ecommerce License',
//     },
//   });
//   const license5 = await prisma.licenses.upsert({
//     where: { id: 0 },
//     update: {},
//     create: {
//       type: 'Web Application UI Kit',
//       price: 100,
//       description: 'Web License',
//     },
//   });
//   const license6 = await prisma.licenses.upsert({
//     where: { id: 0 },
//     update: {},
//     create: {
//       type: 'Marketing UI Kit',
//       price: 100,
//       description: 'Marketing license',
//     },
//   });

//   const uiKit1 = await prisma.uiKits.upsert({
//     where: { id: 0 },
//     update: {},
//     create: {
//       name: 'Ecommerce UI Kit',
//       description: 'Ecommerce kit',
//     },
//   });
//   const uiKit2 = await prisma.uiKits.upsert({
//     where: { id: 0 },
//     update: {},
//     create: {
//       name: 'Web Application UI Kit',
//       description: 'Web Application kit',
//     },
//   });
//   const uiKit3 = await prisma.uiKits.upsert({
//     where: { id: 0 },
//     update: {},
//     create: {
//       name: 'Marketing UI Kit',
//       description: 'Marketing kit',
//     },
//   });

//   const connectUiKit1 = await prisma.uiKits.update({
//     where: {
//       id: 1
//     },
//     data: {
//       licenses: {
//         connect: {
//           id: 1
//         }
//       }
//     }
//   })
//   const connectUiKit2 = await prisma.uiKits.update({
//     where: {
//       id: 2
//     },
//     data: {
//       licenses: {
//         connect: {
//           id: 1
//         }
//       }
//     }
//   })
//   const connectUiKit3 = await prisma.uiKits.update({
//     where: {
//       id: 3
//     },
//     data: {
//       licenses: {
//         connect: {
//           id: 1
//         }
//       }
//     }
//   })


//   console.log({
//     user1,
//     user2,
//     license1,
//     license2,
//     license3,
//     license4,
//     license5,
//     license6,
//     uiKit1,
//     uiKit2,
//     uiKit3,
//     connectUiKit1,
//     connectUiKit2,
//     connectUiKit3,
//   });
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
