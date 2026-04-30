"use client";

import { stepNoteCreate } from "@/server/step-process/note/step-note-create";
import { useState } from "react";

type Props = {
  onCreated: () => void;
};

export default function NoteForm({ onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await stepNoteCreate({
      title,
      content,
      tags,
    });

    setTitle("");
    setContent("");
    setTags("");

    onCreated(); // 再取得
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="w-full border border-gray-200 p-3 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="内容"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <input
        className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="タグ（例: java, spring, aws）"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">
        保存
      </button>
    </form>
  );
}
