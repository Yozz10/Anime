"use client";

import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  if (favorites.length === 0)
    return (
      <main className="min-h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">
          Belum ada anime favorit 💔
        </h1>
        <p className="text-gray-500">
          Kamu bisa menambahkan anime ke daftar favoritmu nanti~
        </p>
      </main>
    );

  return (
    <main className="min-h-screen max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">
        💖 Anime Favorit Kamu
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {favorites.map((anime) => (
          <div
            key={anime.mal_id}
            className="bg-pink-100 rounded-xl shadow-md hover:shadow-lg transition"
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
    </main>
  );
}
