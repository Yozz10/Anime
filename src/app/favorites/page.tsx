"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [animeList, setAnimeList] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(saved);
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.length === 0) return;
      const requests = favorites.map((id) =>
        axios.get(`https://api.jikan.moe/v4/anime/${id}`)
      );
      const results = await Promise.all(requests);
      setAnimeList(results.map((r) => r.data.data));
    };
    fetchFavorites();
  }, [favorites]);

  const removeFavorite = (id: number) => {
    const updated = favorites.filter((f) => f !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setAnimeList(animeList.filter((a) => a.mal_id !== id));
  };

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-6 max-w-6xl mx-auto">
      <nav className="flex justify-between mb-6">
        <Link
          href="/"
          className="bg-pink-400 text-white px-4 py-2 rounded-full text-sm shadow hover:bg-pink-500 transition"
        >
          ⬅️ Kembali
        </Link>
        <h1 className="text-3xl font-bold text-pink-600">💖 Favoritmu</h1>
      </nav>

      {animeList.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">
          Kamu belum menambahkan anime ke favorit 😅
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {animeList.map((anime) => (
            <div
              key={anime.mal_id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden relative"
            >
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => removeFavorite(anime.mal_id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-pink-500"
              >
                ❌
              </button>
              <div className="p-2">
                <h3 className="text-sm font-semibold text-pink-700 truncate">
                  {anime.title}
                </h3>
                <Link
                  href={`/anime/${anime.mal_id}`}
                  className="block mt-2 text-center bg-pink-500 text-white rounded-lg py-1 text-xs font-medium hover:bg-pink-600"
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
