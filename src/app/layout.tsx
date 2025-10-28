import "../globals.css";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import LoadingBar from "../components/LoadingBar";

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
      <body className="bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 text-gray-800 font-inter min-h-screen">
        {/* 🌸 Loading Bar */}
        <LoadingBar />

        {/* 🌸 Navbar */}
        <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-md shadow-sm border-b border-pink-100">
          <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
            {/* 🌸 Kiri */}
            <Link
              href="/"
              className="text-pink-600 font-extrabold text-2xl tracking-tight hover:text-pink-700 transition"
            >
              🌸 AnimeID
            </Link>

            {/* 🌸 Kanan */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-pink-700 font-medium hover:text-pink-900 transition"
              >
                Home
              </Link>

              <Link
                href="/genre"
                className="text-pink-700 font-medium hover:text-pink-900 transition"
              >
                Genre
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

        {/* 🌸 Transisi antar halaman */}
        <AnimatePresence mode="wait">
          <motion.main
            key={typeof window !== "undefined" ? window.location.pathname : ""}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-6xl mx-auto px-4 py-6"
          >
            {children}
          </motion.main>
        </AnimatePresence>

        {/* 🌸 Footer */}
        <footer className="text-center text-sm text-gray-500 py-6 border-t border-pink-200 mt-10 bg-white/50 backdrop-blur-sm">
          <p>
            Dibuat dengan 💕 menggunakan{" "}
            <a
              href="https://jikan.moe/"
              target="_blank"
              className="text-pink-500 hover:underline"
            >
              Jikan API
            </a>{" "}
            — © {new Date().getFullYear()}{" "}
            <span className="font-semibold">AnimeID</span>
          </p>
        </footer>
      </body>
    </html>
  );
}
