import "../globals.css";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion"; // ✨ animasi transisi halaman

export const metadata = {
  title: "AnimeID 🌸",
  description: "Temukan dan simpan anime favoritmu dengan gaya imut!",
  metadataBase: new URL("https://animeid.vercel.app"),
  openGraph: {
    title: "AnimeID 🌸",
    description: "Website anime pink pastel dengan API Jikan",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnimeID 🌸",
    description: "Temukan anime favoritmu dengan tampilan pink pastel",
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
      <body className="bg-pink-50 text-gray-800 font-inter min-h-screen transition-all duration-300">
        {/* 🌸 Navbar */}
        <nav className="bg-pink-200/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
            <Link
              href="/"
              className="text-pink-700 font-extrabold text-2xl tracking-tight hover:text-pink-800 transition"
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

        {/* ✨ Transisi halaman */}
        <AnimatePresence mode="wait">
          <motion.main
            key={typeof window !== "undefined" ? window.location.pathname : ""}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="p-4"
          >
            {children}
          </motion.main>
        </AnimatePresence>

        {/* 🌸 Footer */}
        <footer className="text-center text-sm text-gray-500 py-4 border-t border-pink-200 mt-10">
          Dibuat dengan 💕 menggunakan Jikan API — © {new Date().getFullYear()} AnimeID
        </footer>
      </body>
    </html>
  );
}
