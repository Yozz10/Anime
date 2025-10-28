import "./globals.css";
import Link from "next/link";

/* 🌸 Metadata untuk SEO & Social Media */
export const metadata = {
  title: "AnimeID 🌸",
  description: "Temukan dan simpan anime favoritmu dengan gaya imut!",
  openGraph: {
    title: "AnimeID 🌸",
    description: "Temukan anime favoritmu dengan tampilan cantik & lembut",
    images: ["/og-image.png"], // Pastikan kamu punya file ini di /public/og-image.png
  },
  twitter: {
    card: "summary_large_image",
    title: "AnimeID 🌸",
    description: "Website pencarian anime dengan tema pink pastel",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-pink-50 text-gray-800 min-h-screen flex flex-col">
        {/* 🌸 Navbar */}
        <nav className="bg-pink-200/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
            <Link
              href="/"
              className="text-pink-700 font-extrabold text-2xl tracking-tight hover:text-pink-800 transition animate-bounce-slow"
            >
              🌸 AnimeID
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-pink-700 font-semibold hover:text-pink-900 transition"
              >
                Home
              </Link>

              <Link
                href="/favorites"
                className="bg-pink-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow hover:bg-pink-600 active:scale-95 transition"
              >
                💖 Favorit
              </Link>
            </div>
          </div>
        </nav>

        {/* 🌸 Konten */}
        <main className="flex-1 p-4 max-w-6xl mx-auto w-full animate-fade-in">
          {children}
        </main>

        {/* 🌸 Footer */}
        <footer className="text-center text-sm text-gray-500 py-4 border-t border-pink-200 mt-10">
          Dibuat dengan 💕 menggunakan Jikan API — ©{" "}
          {new Date().getFullYear()} AnimeID
        </footer>
      </body>
    </html>
  );
}
