import { getBillByCode } from "@/prisma-db";

export default async function Bill({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const code = (await params).code;
  const bill = await getBillByCode(code);

  if (!bill) return <h1>No bill found</h1>;

  return (
    <div className="p-6">
      <h1 className="page-header">{bill.title}</h1>
    </div>
  );
}
