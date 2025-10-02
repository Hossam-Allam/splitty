import { getBillByCode } from "@/prisma-db";
import { AddItemButton } from "@/app/components/addItemButton";
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
      <div className="flex flex-row justify-between items-start">
        <h1 className="page-header">{bill.title}</h1>
        <AddItemButton />
      </div>
    </div>
  );
}
