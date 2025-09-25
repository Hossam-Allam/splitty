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
      className="bg-rose-400 p-3 rounded-2xl hover:bg-rose-500"
      onClick={() => deleteFunction(id)}
    >
      Delete
    </button>
  );
};
