import { getBillByCode } from "@/prisma-db";
import { AddItemButton } from "@/app/components/addItemButton";
import { currentUser } from "@clerk/nextjs/server";
import { createItemForBillCode } from "../actions";
import { ItemCard } from "@/app/components/itemCard";
import { BillTotalsCard } from "@/app/components/totalCard";
export default async function Bill({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const code = (await params).code;
  const bill = await getBillByCode(code);
  console.log(bill?.total);
  const user = await currentUser();
  const currentTotal = bill?.items.reduce((sum, item) => sum + item.price, 0);

  const userTotal = bill?.items
    .filter((item) => item.orderedBy?.userId === user?.id)
    .reduce((total, item) => total + item.price, 0);

  if (!bill) return <h1>No bill found</h1>;

  return (
    <div className="p-6">
      <div className="flex flex-row justify-between items-start mb-6">
        <h1 className="page-header">{bill.title}</h1>
        <AddItemButton
          billCode={code}
          userId={user?.id ?? "anon"}
          createFunction={createItemForBillCode}
        />
      </div>

      <div className="space-y-3">
        {bill.items.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            orderedByUserId={item.orderedBy?.userId ?? "unknown"}
            currentUserId={user?.id ?? ""}
            displayName={item.orderedBy?.displayName ?? ""}
          />
        ))}
      </div>

      <BillTotalsCard
        realTotal={bill.total ?? 0}
        currentTotal={currentTotal ?? 0}
        userTotal={userTotal ?? 0}
      />
    </div>
  );
}
