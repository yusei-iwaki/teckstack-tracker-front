"use client";

import { useState } from "react";
import { API_ROUTES } from "@/constants/api-route";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch(API_ROUTES.USERS.CREATE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("登録に失敗しました");

      setMessage("登録成功！");
      setEmail("");
      setPassword("");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* タイトル */}
      <div>
        <h2 className="text-2xl font-bold">アカウント作成</h2>
        <p className="text-sm text-gray-500 mt-1">
          メールアドレスとパスワードを入力してください
        </p>
      </div>

      {/* フォーム */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium">メールアドレス</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm font-medium">パスワード</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="8文字以上"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* ボタン */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-md font-medium"
        >
          アカウントを作成
        </button>

        {/* メッセージ */}
        {message && (
          <p className="text-sm text-green-600 bg-green-50 p-2 rounded">
            {message}
          </p>
        )}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>
        )}
      </form>

      {/* 導線 */}
      <p className="text-sm text-center text-gray-600">
        すでにアカウントがありますか？
        <Link href="/user/login" className="text-blue-600 ml-1 font-medium">
          ログイン
        </Link>
      </p>
    </div>
  );
}
