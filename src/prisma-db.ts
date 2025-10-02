import { PrismaClient } from "./generated/prisma";
import { randomBytes } from "crypto";
import { CreateItemArgs } from "./app/bills/actions";
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
  displayName: string; 
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

export async function addParticipantToBill({
  billCode,
  userId,
  displayName,
}: {
  billCode: string;
  userId: string;
  displayName: string;
}) {
  try {
    // Find the bill by its join code
    const bill = await prisma.bill.findUnique({
      where: { code: billCode },
    });

    if (!bill) {
      throw new Error("Bill not found");
    }

    // Check if this user is already a participant
    const existing = await prisma.participant.findFirst({
      where: {
        billId: bill.id,
        userId,
      },
    });

    if (existing) {
      return existing; 
    }

    
    const participant = await prisma.participant.create({
      data: {
        billId: bill.id,
        userId,
        displayName,
      },
    });

    return participant;
  } catch (error) {
    console.error("Error adding participant to bill:", error);
    throw error;
  }
}


export async function leaveBill({
  billCode,
  userId,
}: {
  billCode: string;
  userId: string;
}) {
  try {
    const bill = await prisma.bill.findUnique({
      where: { code: billCode },
      include: { participants: true },
    });

    if (!bill) throw new Error("Bill not found");

    const participant = bill.participants.find((p) => p.userId === userId);
    if (!participant) throw new Error("Participant not found in this bill");

    await prisma.participant.delete({
      where: { id: participant.id },
    });

    return { success: true };
  } catch (error) {
    console.error("Error leaving bill:", error);
    throw error;
  }
}

export async function getBillByCode(code: string) {
  try {
    const bill = await prisma.bill.findUnique({
      where: { code },
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
    });

    return bill; // null if not found
  } catch (error) {
    console.error("Error retrieving bill by code:", error);
    throw error;
  }
}

export async function createItemForBillCode({
  billCode,
  userId, 
  name,
  price,
  notes,
}: CreateItemArgs) {
  try {
    // 1. Find the bill by code
    const bill = await prisma.bill.findUnique({
      where: { code: billCode },
      include: { participants: true },
    });

    if (!bill) {
      throw new Error("Bill not found");
    }

    // 2. Find participant in this bill
    const participant = bill.participants.find((p) => p.userId === userId);
    if (!participant) {
      throw new Error("User is not a participant in this bill");
    }

    // 3. Create the item
    const item = await prisma.item.create({
      data: {
        name,
        price,
        notes,
        billId: bill.id,
        orderedByParticipantId: participant.id,
      },
      include: {
        orderedBy: true,
        bill: true,
      },
    });

    return item;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
}

