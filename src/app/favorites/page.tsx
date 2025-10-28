"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  const removeFavorite = (id: number) => {
    const updated = favorites.filter((item) => item.mal_id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (favorites.length === 0)
    return (
      <main className="text-center mt-10 text-gray-600">
        💖 Belum ada anime favorit yang disimpan.
      </main>
    );

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">
        💖 Anime Favoritmu
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {favorites.map((anime) => (
          <div
            key={anime.mal_id}
            className="card bg-pink-100 rounded-xl shadow-md hover:shadow-lg transition relative"
          >
            <Link href={`/anime/${anime.mal_id}`}>
              <img
                src={anime.image}
                alt={anime.title}
                className="rounded-t-xl w-full"
              />
            </Link>
            <div className="p-2">
              <h3 className="text-sm font-semibold text-pink-700 truncate">
                {anime.title}
              </h3>
              <p className="text-xs text-pink-500">⭐ {anime.score}</p>
            </div>
            <button
              onClick={() => removeFavorite(anime.mal_id)}
              className="absolute top-2 right-2 bg-pink-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm hover:bg-pink-700 shadow"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
