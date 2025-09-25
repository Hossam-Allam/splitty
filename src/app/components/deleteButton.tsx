"use client";

export const DeleteButton = ({
  id,
  deleteFunction,
}: {
  id: number;
  deleteFunction: (id: number) => void;
}) => {
  return (
    <button
      className="bg-pink-900 p-3 rounded-2xl hover:bg-pink-700"
      onClick={() => deleteFunction(id)}
    >
      Delete
    </button>
  );
};
