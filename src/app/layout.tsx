import "../globals.css";
import Link from "next/link";

export const metadata = {
  title: "AnimeID 🌸",
  description: "Streaming & Info Anime menggunakan Jikan API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-pink-50 text-gray-800 min-h-screen">
        {/* Navbar */}
        <nav className="bg-pink-200 shadow-md py-3 px-6 flex justify-between items-center">
          <Link href="/" className="text-pink-700 font-bold text-xl">
            🌸 AnimeID
          </Link>
          <div className="flex gap-3">
            <Link
              href="/"
              className="text-pink-700 hover:text-pink-800 font-semibold"
            >
              Home
            </Link>
            <Link
              href="/favorites"
              className="bg-pink-500 text-white px-4 py-1 rounded-full text-sm shadow hover:bg-pink-600 transition"
            >
              💖 Favorit
            </Link>
          </div>
        </nav>

        {/* Konten halaman */}
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
