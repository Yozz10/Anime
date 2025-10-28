"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <main className="min-h-screen px-4 py-6 max-w-6xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-pink-600">
          Pencari Rekomendasi Anime
        </h1>
        <p className="text-gray-600 mt-2">
          Temukan anime favoritmu berikutnya!
        </p>

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

      {loading ? (
        <p className="text-center text-gray-500">Memuat data...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {animeList.map((anime) => (
            <div
              key={anime.mal_id}
              className="card bg-pink-100 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="rounded-t-xl"
              />
              <div className="p-2">
                <h3 className="text-sm font-semibold text-pink-700 truncate">
                  {anime.title}
                </h3>
                <p className="text-xs text-pink-500">⭐ {anime.score}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
