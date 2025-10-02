"use client";

import { useRouter } from "next/navigation";

export const DeleteButton = ({
  id,
  deleteFunction,
}: {
  id: number;
  deleteFunction: (id: number) => void;
}) => {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteFunction(id);
    router.refresh();
  };

  return (
    <button
      className="bg-pink-900 p-3 rounded-2xl hover:bg-pink-700"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};
