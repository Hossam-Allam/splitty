import { currentUser } from "@clerk/nextjs/server";
import { getUserBills } from "@/prisma-db";
import {
  deleteBill,
  createBill,
  addParticipantToBill,
  leaveBill,
} from "./actions";
import { DeleteButton } from "../components/deleteButton";
import { AddButton } from "../components/addButton";
import { JoinButton } from "../components/joinButton";
import { LeaveButton } from "../components/leaveButton";

export default async function Bills() {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-semibold">
          Please sign in to view your bills
        </h1>
      </div>
    );
  }

  console.log(user.id);
  const bills = await getUserBills(user.id);

  return (
    <div className="p-6">
      {bills.length > 0 ? (
        <div>
          <div className="flex flex-row justify-between items-start">
            <h1 className="text-2xl font-semibold mb-4">Your Bills</h1>
            <div className="flex flex-row gap-3">
              <AddButton
                createdBy={user.id}
                displayName={user.fullName ?? "Anonymous"}
                createFunction={createBill}
              />
              <JoinButton
                userId={user.id}
                displayName={user.fullName ?? "Anonymous"}
                joinFunction={addParticipantToBill}
              />
            </div>
          </div>
          <ul className="space-y-3">
            {bills.map((bill) => (
              <li
                key={bill.id}
                className="p-4 bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition-colors"
              >
                <div className="flex flex-row justify-between">
                  <div>
                    <h2 className="text-lg font-medium">{bill.title}</h2>
                    <p className="text-sm text-gray-400">
                      Code: {bill.code} | Items: {bill.items.length}
                    </p>
                  </div>

                  <div className="flex flex-row gap-2">
                    {bill.createdBy === user.id ? (
                      // User is the creator
                      <DeleteButton id={bill.id} deleteFunction={deleteBill} />
                    ) : (
                      // User is only a participant
                      <LeaveButton
                        billCode={bill.code}
                        userId={user.id}
                        leaveFunction={leaveBill}
                      />
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <div className="flex flex-row justify-between items-start">
            <h1 className="text-2xl font-semibold mb-4">No bills yet</h1>
            <div className="flex flex-row gap-3">
              <AddButton
                createdBy={user.id}
                displayName={user.fullName ?? "Anonymous"}
                createFunction={createBill}
              />
              <JoinButton
                userId={user.id}
                displayName={user.fullName ?? "Anonymous"}
                joinFunction={addParticipantToBill}
              />
            </div>
          </div>
          <h1 className="text-xl font-semibold text-center">
            You don’t have any bills yet. Create one!
          </h1>
        </div>
      )}
    </div>
  );
}
