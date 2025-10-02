"use server";

import { deleteBill as deleteBillFromDb } from "@/prisma-db";
import { CreateBillArgs } from "../components/addButton";
import { createBill as createBillFromDb } from "@/prisma-db";
import { addParticipantToBill as addParticipantToBillFromDb } from "@/prisma-db";
import { leaveBill as leaveBillFromDb } from "@/prisma-db";
import { createItemForBillCode as createItemForBillCodeFromDb } from "@/prisma-db";
import { deleteItemFromBill as deleteItemFromDb } from "@/prisma-db";

export type JoinBillArgs = {
  billCode: string;
  userId: string;
  displayName: string;
};

export type LeaveBillArgs = {
  billCode: string;
  userId: string;
};

export type CreateItemArgs = {
  billCode: string;
  userId: string;   
  name: string;
  price: number;
  notes?: string;
};

export async function deleteBill(id: number) {
  await deleteBillFromDb(id);
}

export async function createBill({ title, createdBy, displayName, total }: CreateBillArgs) {
  await createBillFromDb({ title, createdBy, displayName, total });
}

export async function addParticipantToBill({ billCode, userId, displayName}: JoinBillArgs) {
  await addParticipantToBillFromDb({ billCode, userId, displayName})
}

export async function leaveBill({billCode, userId}: LeaveBillArgs) {
  await leaveBillFromDb({billCode, userId})
}

export async function createItemForBillCode({billCode, userId, name, price, notes}: CreateItemArgs) {
  await createItemForBillCodeFromDb({billCode, userId, name, price, notes})
}

export async function deleteItemFromBill(itemId: number) {
  await deleteItemFromDb(itemId);
}