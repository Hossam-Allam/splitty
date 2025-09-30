"use server";

import { deleteBill as deleteBillFromDb } from "@/prisma-db";
import { CreateBillArgs } from "../components/addButton";
import { createBill as createBillFromDb } from "@/prisma-db";
import { addParticipantToBill as addParticipantToBillFromDb } from "@/prisma-db";

export type JoinBillArgs = {
  billCode: string;
  userId: string;
  displayName: string;
};

export async function deleteBill(id: number) {
  await deleteBillFromDb(id);
}

export async function createBill({ title, createdBy, displayName }: CreateBillArgs) {
  await createBillFromDb({ title, createdBy, displayName });
}

export async function addParticipantToBill({ billCode, userId, displayName}: JoinBillArgs) {
  await addParticipantToBillFromDb({ billCode, userId, displayName})
}