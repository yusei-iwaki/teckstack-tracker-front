import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900">
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-7xl bg-white p-8 rounded-2xl shadow">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
