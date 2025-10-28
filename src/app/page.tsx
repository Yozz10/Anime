"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // === FETCH ANIME ===
  const fetchAnime = async (query?: string) => {
    setLoading(true);
    const url = query
      ? `https://api.jikan.moe/v4/anime?q=${query}&limit=18&order_by=popularity`
      : `https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=18`;
    const res = await axios.get(url);
    setAnimeList(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAnime();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAnime(search);
  };

  // === FAVORITE SYSTEM ===
  const toggleFavorite = (anime: any) => {
    let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = favs.some((a: any) => a.mal_id === anime.mal_id);

    if (exists) {
      favs = favs.filter((a: any) => a.mal_id !== anime.mal_id);
    } else {
      favs.push(anime);
    }

    localStorage.setItem("favorites", JSON.stringify(favs));
    alert(
      exists
        ? `❌ ${anime.title} dihapus dari favorit`
        : `💖 ${anime.title} ditambahkan ke favorit`
    );
  };

  return (
    <main className="min-h-screen px-4 py-6 max-w-6xl mx-auto">
      {/* 🌸 Navbar Sederhana */}
      <nav className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-pink-600">
          Anime<span className="text-pink-400">ID</span>
        </h1>
        <Link
          href="/favorites"
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm shadow transition"
        >
          💖 Favorit
        </Link>
      </nav>

      {/* 🩷 Header */}
      <header className="text-center mb-8">
        <h2 className="text-4xl font-bold text-pink-600">
          Pencari Rekomendasi Anime
        </h2>
        <p className="text-gray-600 mt-2">
          Temukan anime favoritmu berikutnya!
        </p>

        {/* 🔍 Form Search */}
        <form
          onSubmit={handleSearch}
          className="flex justify-center mt-6 max-w-md mx-auto"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari anime..."
            className="flex-1 p-3 rounded-l-lg border border-pink-300 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 rounded-r-lg font-semibold"
          >
            Cari
          </button>
        </form>
      </header>

      {/* 🎬 Konten */}
      {loading ? (
        <p className="text-center text-gray-500">Memuat data...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {animeList.map((anime) => (
            <div
              key={anime.mal_id}
              className="relative bg-pink-100 rounded-xl shadow-md hover:shadow-lg transition"
            >
              {/* 💖 Tombol Favorit */}
              <button
                onClick={() => toggleFavorite(anime)}
                className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full shadow hover:bg-pink-600 transition"
              >
                💖
              </button>

              {/* 🎥 Gambar + Link ke detail */}
              <Link href={`/anime/${anime.mal_id}`} className="block">
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="rounded-t-xl w-full"
                />
                <div className="p-2">
                  <h3 className="text-sm font-semibold text-pink-700 truncate">
                    {anime.title}
                  </h3>
                  <p className="text-xs text-pink-500">⭐ {anime.score}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
