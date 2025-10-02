import { getBillByCode } from "@/prisma-db";

export default async function Bill({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const code = (await params).code;
  const bill = await getBillByCode(code);

  if (!bill) return <h1>No bill found</h1>;

  return <h1>Hello {bill?.title}</h1>;
}
