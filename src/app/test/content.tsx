"use client";

import { API_ROUTES } from "@/constants/api-route";
import { useEffect, useState } from "react";

export default function Content() {
  const [message, setMessage] = useState("");

  const handleTest = async () => {
    try {
      const res = await fetch(API_ROUTES.TEST, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("テスト通信に失敗しました");
      const data = await res.text();

      setMessage(data);
    } catch (e: any) {
      setMessage(e.message);
    }
  };

  useEffect(() => {
    handleTest();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Test API</h2>
      <p>{message}</p>
    </div>
  );
}
