"use client";

import NoteEditModal from "@/components/note-edit-modal";
import NoteForm from "@/components/note-form";
import NoteList from "@/components/note-list";
import TagSidebar from "@/components/tag-sidebar";
import { API_ROUTES } from "@/constants/api-route";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  const fetchNotes = async () => {
    try {
      const url = tag
        ? `${API_ROUTES.NOTE.LIST}?tag=${tag}`
        : API_ROUTES.NOTE.LIST;

      const res = await fetch(url, {
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
  }, [tag]);

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6 flex gap-6">
      {/* 🔥 左：タグサイドバー */}
      <div className="w-64 sticky top-20 h-fit hidden md:block">
        <TagSidebar />
      </div>

      {/* 🔥 右：メイン */}
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">ダッシュボード</h1>

        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden mb-4 px-3 py-2 bg-gray-800 text-white rounded"
        >
          タグで絞り込み
        </button>

        {/* 作成 */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-semibold mb-4">メモ作成</h2>
          <NoteForm onCreated={fetchNotes} />
        </div>

        {/* 一覧 */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-semibold mb-4">メモ一覧</h2>

          {tag && (
            <div className="flex items-center justify-between mb-4 hidden sm:flex">
              <div className="text-sm">
                フィルタ中: <span className="font-bold">#{tag}</span>
              </div>

              <button
                onClick={() => router.push("/dashboard")}
                className="text-xs text-blue-500 hover:underline"
              >
                クリア
              </button>
            </div>
          )}

          <NoteList
            notes={notes}
            onDeleted={fetchNotes}
            onEdit={setEditingNote}
          />
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* 背景 */}
          <div
            className="flex-1 bg-black/30"
            onClick={() => setIsOpen(false)}
          />

          {/* ドロワー */}
          <div className="w-64 bg-white p-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold">タグ</h2>
              <button onClick={() => setIsOpen(false)}>✕</button>
            </div>

            <TagSidebar onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}

      {/* モーダル */}
      {editingNote && (
        <NoteEditModal
          note={editingNote}
          onClose={() => setEditingNote(null)}
          onUpdated={fetchNotes}
        />
      )}
    </div>
  );
}
