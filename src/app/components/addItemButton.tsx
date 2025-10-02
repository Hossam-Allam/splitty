"use client";
import { useState } from "react";
import { CreateItemArgs } from "../bills/actions";

export const AddItemButton = ({
  billCode,
  userId,
  createFunction,
}: {
  billCode: string;
  userId: string;
  createFunction: (args: CreateItemArgs) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || price === "") return;

    createFunction({
      billCode,
      userId,
      name,
      price: Number(price),
      notes: notes || undefined,
    });

    setIsOpen(false);
    setName("");
    setPrice("");
    setNotes("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-emerald-700 px-3 py-1 rounded-sm hover:bg-emerald-800"
      >
        Add Item
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Add a new item
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Item name"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />

              <input
                type="number"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value === "" ? "" : Number(e.target.value))
                }
                placeholder="Price"
                step="0.01"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes (optional)"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
