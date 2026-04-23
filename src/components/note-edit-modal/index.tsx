"use client";

import { API_ROUTES } from "@/constants/api-route";
import { useState } from "react";

type Props = {
  note: any;
  onClose: () => void;
  onUpdated: () => void;
};

export default function NoteEditModal({ note, onClose, onUpdated }: Props) {
  const [form, setForm] = useState(note);
  const handleSave = async () => {
    await fetch(API_ROUTES.NOTE.UPDATE(note.id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title: form.title,
        content: form.content,
      }),
    });

    onClose();
    onUpdated();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl">
        <h2 className="text-lg font-bold mb-4">メモ編集</h2>

        <input
          className="w-full border p-2 rounded mb-3"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="w-full border p-2 rounded h-24"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="text-gray-500">
            キャンセル
          </button>

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
