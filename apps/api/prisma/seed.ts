import { PrismaClient } from "@prisma/client";

// TODO(Sprint 1): implement seed — load packages/mock-data/cars.json and
// upsert Car rows. Map driveType values: "2WD" → TWO_WD, "4WD" → FOUR_WD.
// Example shape:
//
//   await prisma.car.createMany({
//     data: cars.map((c) => ({ ...c, driveType: driveTypeMap[c.driveType] })),
//     skipDuplicates: true,
//   });

const prisma = new PrismaClient();

async function main() {
  console.log("Seed is not implemented yet — see TODO(Sprint 1) in this file.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
