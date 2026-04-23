"use client";

import { API_ROUTES } from "@/constants/api-route";

type Props = {
  notes: any[];
  onDeleted: () => void;
  onEdit: (id: any) => void;
};

export default function NoteList({ notes, onDeleted, onEdit }: Props) {
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

            <div className="flex gap-2 text-sm">
              <button
                onClick={() => onEdit(note)}
                className="text-blue-500 hover:text-blue-600 cursor-pointer"
              >
                編集
              </button>

              <button
                onClick={() => handleDelete(note.id)}
                className="text-red-500 hover:text-red-600 cursor-pointer"
              >
                削除
              </button>
            </div>
          </div>

          <p className="text-gray-600 mt-2 text-sm whitespace-pre-wrap">
            {note.content}
          </p>

          {/* タグ */}
          <div className="flex gap-2 flex-wrap mt-3">
            {note.tags?.map((tag: string) => (
              <span
                key={tag}
                className="bg-gray-200 text-xs px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-3">
            {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
