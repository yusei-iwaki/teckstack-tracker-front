"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./globals.css";
import { API_ROUTES } from "@/constants/api-route";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // ログイン状態チェック
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch(API_ROUTES.USER.ME, {
          credentials: "include",
        });

        setIsLoggedIn(res.ok);
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  const logout = async () => {
    await fetch(API_ROUTES.AUTH.LOGOUT, {
      method: "POST",
      credentials: "include",
    });

    setIsLoggedIn(false); // 即反映
    location.href = "/user/login";
  };

  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-bold text-xl text-gray-900">
            TechStack Tracker
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-600 cursor-pointer"
              >
                ログアウト
              </button>
            ) : (
              <>
                <Link
                  href="/user/login"
                  className="text-gray-700 hover:text-gray-900"
                >
                  ログイン
                </Link>

                <Link
                  href="/user/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm"
                >
                  新規登録
                </Link>
              </>
            )}
          </nav>
        </header>

        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-7xl bg-white p-8 rounded-2xl shadow">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
