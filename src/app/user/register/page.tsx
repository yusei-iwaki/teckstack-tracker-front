"use client";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage(null);
    setError(null);

    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("登録に失敗しました");
      }

      setMessage("登録成功！");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8">TechStack Tracker</h1>

        {/* フォーム */}
        <form
          onSubmit={handleSubmit}
          className="p-6 border rounded-xl bg-gray-50 text-black space-y-4"
        >
          <h2 className="text-xl font-bold">ユーザー登録</h2>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            登録
          </button>

          {/* メッセージ */}
          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </main>
  );
}
