"use client";

import { API_ROUTES } from "@/constants/api-route";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(API_ROUTES.AUTH.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("ログイン失敗");

      location.href = "/dashboard";
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <h2 className="text-2xl font-bold">ログイン</h2>

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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button className="w-full bg-blue-600 text-white p-2 rounded">
        ログイン
      </button>

      {error && <p className="text-red-500">{error}</p>}

      <p className="text-sm text-center">
        アカウントをお持ちでないですか？
        <Link href="/user/register" className="text-blue-600 ml-1">
          登録
        </Link>
      </p>
    </form>
  );
}
