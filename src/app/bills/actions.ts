"use server";

import { deleteBill as deleteBillFromDb } from "@/prisma-db";
import { CreateBillArgs } from "../components/addButton";
import { createBill as createBillFromDb } from "@/prisma-db";

export async function deleteBill(id: number) {
  await deleteBillFromDb(id);
}

export async function createBill({ title, createdBy, displayName }: CreateBillArgs) {
  await createBillFromDb({ title, createdBy, displayName });
}