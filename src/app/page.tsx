import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-3xl font-bold">TechStack Tracker</h1>

      <p className="text-gray-500">学んだ技術を記録し、成長を可視化しよう</p>

      <div className="flex gap-4 justify-center">
        <Link
          href="/user/login"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          ログイン
        </Link>

        <Link href="/user/register" className="border px-4 py-2 rounded">
          新規登録
        </Link>
      </div>
    </div>
  );
}
