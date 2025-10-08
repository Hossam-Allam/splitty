import { NextResponse } from "next/server";
import { getBillByCode } from "@/prisma-db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{code: string}> }
) {
  const billCode = (await params).code;
  const bill = await getBillByCode(billCode);

  
  return NextResponse.json({
    updatedAt: bill?.updatedAt,
    total: bill?.total,
    itemCount: bill?.items.length,
  });
}
