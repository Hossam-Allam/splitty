"use client";

import { useState } from "react";

export type CreateBillArgs = {
  title: string;
  createdBy: string;
  displayName: string;
};

export const AddButton = ({
  createdBy,
  displayName,
  createFunction,
}: {
  createdBy: string;
  displayName: string;
  createFunction: (args: CreateBillArgs) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createFunction({ title, createdBy, displayName });

    setIsOpen(false);
    setTitle("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-emerald-700 px-3 py-1 rounded-sm hover:bg-emerald-800"
      >
        Add
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Create a new bill
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Bill title"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                  className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
