import { PrismaClient } from "./generated/prisma";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();


const seed = async () => {
    const count = await prisma.bill.count();

    if(count ===0){
        await prisma.bill.createMany({
            data: [
                {title: "First Bill", code: "25hx", createdBy: "user_32z8c6fdIGzJ5mPGGIBqvULn7Vy"}
            ]
        })
    }
}

seed();

export async function getUserBills(userId: string) {
  try {
    const bills = await prisma.bill.findMany({
      where: {
        OR: [
          { createdBy: userId },
          {
            participants: {
              some: { userId: userId },
            },
          },
        ],
      },
      include: {
        participants: {
          select: {
            id: true,
            userId: true,
            displayName: true,
          },
        },
        items: {
          select: {
            id: true,
            name: true,
            price: true,
            orderedBy: {
              select: {
                userId: true,
                displayName: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return bills;
  } catch (error) {
    console.error("Error retrieving user bills:", error);
    throw error;
  }
}

export async function deleteBill(id: number) {
    return prisma.bill.delete({where: {id}})
}

export async function createBill({
  title,
  createdBy,
  displayName,
}: {
  title: string;
  createdBy: string; // Clerk userId
  displayName: string; // So you can show the name in participants
}) {
  try {
    // Generate a short unique code (6 chars)
    const joinCode = randomBytes(3).toString("hex").toUpperCase();

    const bill = await prisma.bill.create({
      data: {
        title,
        createdBy,
        code: joinCode,
        participants: {
          create: {
            userId: createdBy,
            displayName,
          },
        },
      },
      include: {
        participants: true,
        items: true,
      },
    });

    return bill;
  } catch (error) {
    console.error("Error creating bill:", error);
    throw error;
  }
}