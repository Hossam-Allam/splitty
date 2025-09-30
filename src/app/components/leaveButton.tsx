"use client";

import { LeaveBillArgs } from "../bills/actions";

export const LeaveButton = ({
  billCode,
  userId,
  leaveFunction,
}: {
  billCode: string;
  userId: string;
  leaveFunction: (args: LeaveBillArgs) => void;
}) => {
  return (
    <button
      className="bg-yellow-900 p-3 rounded-2xl hover:bg-yellow-700"
      onClick={() => leaveFunction({ billCode, userId })}
    >
      Leave
    </button>
  );
};
