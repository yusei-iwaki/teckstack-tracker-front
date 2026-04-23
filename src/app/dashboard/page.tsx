"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/api-route";
import NoteForm from "@/components/note-form";
import NoteList from "@/components/note-list";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const router = useRouter();

  const fetchNotes = async () => {
    try {
      const res = await fetch(API_ROUTES.NOTE.LIST, {
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setNotes(data);
    } catch {
      router.push("/user/login");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">ダッシュボード</h1>

      {/* 作成 */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="font-semibold mb-4">メモ作成</h2>
        <NoteForm onCreated={fetchNotes} />
      </div>

      {/* 一覧 */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="font-semibold mb-4">メモ一覧</h2>
        <NoteList notes={notes} onDeleted={fetchNotes} />
      </div>
    </div>
  );
}
