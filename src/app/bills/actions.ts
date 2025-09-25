"use server";

import { deleteBill as deleteBillFromDb } from "@/prisma-db";

export async function deleteBill(id: number) {
  await deleteBillFromDb(id);
}