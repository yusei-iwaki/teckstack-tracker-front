"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/api-route";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }
    const getUser = async () => {
      const res = await fetch(API_ROUTES.USERS.ME, {
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      const data = await res.text();
      setEmail(data);
    };

    try {
      getUser();
    } catch {
      localStorage.removeItem("token");
      router.push("/user/login");
    }
  }, []);

  if (!email) return <p>読み込み中...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">ダッシュボード</h1>

      <div className="p-4 bg-gray-100 rounded">
        <p className="text-sm text-gray-500">ログイン中</p>
        <p className="font-medium">{email}</p>
      </div>

      <div className="p-4 border rounded">
        <p className="text-gray-600">
          技術メモをここに追加していきます（次のステップ）
        </p>
      </div>
    </div>
  );
}
