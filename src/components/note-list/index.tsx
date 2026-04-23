"use client";

import { API_ROUTES } from "@/constants/api-route";

type Props = {
  notes: any[];
  onDeleted: () => void;
};

export default function NoteList({ notes, onDeleted }: Props) {
  const handleDelete = async (id: number) => {
    await fetch(API_ROUTES.NOTE.DELETE(id), {
      method: "DELETE",
      credentials: "include",
    });

    onDeleted();
  };

  return (
    <div className="space-y-4">
      {notes.length === 0 && (
        <p className="text-gray-400 text-center">まだメモがありません</p>
      )}
      {notes.map((note: any) => (
        <div
          key={note.id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow transition"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">{note.title}</h3>

            <button
              onClick={() => handleDelete(note.id)}
              className="text-sm text-red-500 hover:text-red-600"
            >
              削除
            </button>
          </div>

          <p className="text-gray-600 mt-2 text-sm whitespace-pre-wrap">
            {note.content}
          </p>

          <p className="text-xs text-gray-400 mt-3">
            {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
