"use client";

import React from "react";

type BillTotalsCardProps = {
  realTotal: number;
  currentTotal: number;
  userTotal: number;
};

export const BillTotalsCard = ({
  realTotal,
  currentTotal,
  userTotal,
}: BillTotalsCardProps) => {
  let currentTotalColor = "text-white";

  if (currentTotal < realTotal) {
    currentTotalColor = "text-red-500";
  } else if (currentTotal > realTotal) {
    currentTotalColor = "text-yellow-400";
  } else {
    currentTotalColor = "text-green-500";
  }

  return (
    <div className="fixed bottom-6 right-6 w-64 p-4 rounded-xl bg-gray-800/80 backdrop-blur-sm shadow-lg text-white z-50">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between">
          <span className="font-semibold">Real Total:</span>
          <span>${realTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Your Total:</span>
          <span>${userTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Current Total:</span>
          <span className={currentTotalColor}>${currentTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
