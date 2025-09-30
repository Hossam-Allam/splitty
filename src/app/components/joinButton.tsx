"use client";

import { JoinBillArgs } from "../bills/actions";
import { useState } from "react";

export const JoinButton = ({
  userId,
  displayName,
  joinFunction,
}: {
  userId: string;
  displayName: string;
  joinFunction: (args: JoinBillArgs) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [billCode, setBillCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    joinFunction({ billCode, userId, displayName });

    setIsOpen(false);
    setBillCode("");
  };

  return (
    <>
      <button
        className="bg-cyan-700 px-3 py-1 rounded-sm hover:bg-cyan-800"
        onClick={() => setIsOpen(true)}
      >
        Join
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Join a bill!
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={billCode}
                onChange={(e) => setBillCode(e.target.value)}
                placeholder="Bill code"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
