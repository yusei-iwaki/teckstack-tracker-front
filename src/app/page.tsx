"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<{ message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Spring BootのAPIを叩く
    fetch("http://localhost:8080/api/hello")
      .then((res) => {
        if (!res.ok) throw new Error("通信に失敗しました");
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-500px items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">TechStack Tracker</h1>

        <div className="p-6 border rounded-xl bg-gray-50 text-black">
          <p className="font-bold">Backendからのレスポンス:</p>
          {error && <p className="text-red-500">{error}</p>}
          {data ? (
            <p className="text-green-600 text-xl">{data.message}</p>
          ) : (
            !error && <p>読み込み中...</p>
          )}
        </div>
      </div>
    </main>
  );
}
