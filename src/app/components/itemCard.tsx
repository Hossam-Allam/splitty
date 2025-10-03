"use client";

import { useState } from "react";
import { deleteItemFromBill } from "../bills/actions";
import { useRouter } from "next/navigation";

export type ItemCardProps = {
  id: number;
  name: string;
  price: number;
  notes?: string;
  orderedByUserId: string;
  currentUserId: string;
  displayName: string;
};

export const ItemCard = ({
  id,
  name,
  price,
  notes,
  orderedByUserId,
  currentUserId,
  displayName,
}: ItemCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteItemFromBill(id);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <div className="p-3 bg-gray-700 rounded-lg shadow hover:bg-gray-600 transition-colors flex justify-between items-center">
      <div>
        <h2 className="text-lg">{name}</h2>
        <h3 className="text-gray-300">
          Ordered by: <span className="text-white">{displayName}</span>
        </h3>
        <p className="text-sm text-gray-300">${price.toFixed(2)}</p>
        {notes && <p className="text-sm text-gray-400">Notes: {notes}</p>}
      </div>

      {orderedByUserId === currentUserId && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-pink-900 p-3 rounded-2xl hover:bg-pink-700"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      )}
    </div>
  );
};
