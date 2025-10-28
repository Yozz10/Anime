"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [animating, setAnimating] = useState<number | null>(null);

  // 🔹 Ambil daftar favorit dari localStorage saat pertama kali load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(saved);
  }, []);

  // 🔹 Fetch data anime
  const fetchAnime = async (query?: string) => {
    setLoading(true);
    try {
      const url = query
        ? `https://api.jikan.moe/v4/anime?q=${query}&limit=18&order_by=popularity`
        : `https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=18`;
      const res = await axios.get(url);
      setAnimeList(res.data.data);
    } catch (err) {
      console.error("Gagal memuat data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime();
  }, []);

  // 🔹 Fungsi pencarian
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAnime(search);
  };

  // 🔹 Menambahkan / menghapus anime favorit
  const toggleFavorite = (id: number) => {
    let updated = [...favorites];
    if (updated.includes(id)) {
      updated = updated.filter((f) => f !== id);
    } else {
      updated.push(id);
      setAnimating(id);
      setTimeout(() => setAnimating(null), 600);
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-6 max-w-6xl mx-auto transition-all duration-300">
      {/* === Navbar === */}
      <nav className="flex justify-end mb-4">
        <Link
          href="/favorites"
          className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm shadow hover:bg-pink-600 transition"
        >
          💖 Favorit
        </Link>
      </nav>

      {/* === Header === */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-pink-600 animate-bounce-slow">
          🌸 Pencari Rekomendasi Anime 🌸
        </h1>
        <p className="text-gray-600 mt-2">Temukan anime favoritmu berikutnya!</p>

        <form
          onSubmit={handleSearch}
          className="flex justify-center mt-6 max-w-md mx-auto"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari anime..."
            className="flex-1 p-3 rounded-l-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 rounded-r-lg font-semibold"
          >
            Cari
          </button>
        </form>
      </header>

      {/* === Konten === */}
      {loading ? (
        <p className="text-center text-gray-500 mt-8 animate-pulse">
          Memuat data...
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-fade-in">
          {animeList.map((anime) => (
            <div
              key={anime.mal_id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden relative transform hover:-translate-y-1"
            >
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-48 object-cover"
              />

              {/* Tombol Favorit 💖 */}
              <button
                onClick={() => toggleFavorite(anime.mal_id)}
                className={`absolute top-2 right-2 text-2xl transition-transform duration-300 ${
                  animating === anime.mal_id
                    ? "scale-125 animate-pulse"
                    : "scale-100"
                } ${
                  favorites.includes(anime.mal_id)
                    ? "text-pink-500"
                    : "text-gray-400 hover:text-pink-400"
                }`}
              >
                💖
              </button>

              {/* Info Anime */}
              <div className="p-3">
                <h3 className="text-sm font-semibold text-pink-700 truncate">
                  {anime.title}
                </h3>
                <p className="text-xs text-pink-500">⭐ {anime.score || "N/A"}</p>

                <Link
                  href={`/anime/${anime.mal_id}`}
                  className="block mt-3 text-center bg-pink-500 text-white rounded-lg py-1 text-xs font-medium hover:bg-pink-600 transition"
                >
                  🎬 Tonton
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
