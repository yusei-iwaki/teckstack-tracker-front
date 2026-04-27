"use client";

import { stepLogout } from "@/server/step-process/step-logout";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeaderForMember() {
  const router = useRouter();
  const logout = async () => {
    await stepLogout();
    router.push("/");
  };
  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl text-gray-900">
        TechStack Tracker
      </Link>

      <nav className="flex items-center gap-6 text-sm font-medium">
        <button
          onClick={logout}
          className="text-red-500 hover:text-red-600 cursor-pointer"
        >
          ログアウト
        </button>
      </nav>
    </header>
  );
}
