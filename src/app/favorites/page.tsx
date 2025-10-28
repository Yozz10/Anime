"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Ambil daftar ID anime favorit dari localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(saved);
  }, []);

  // 🔹 Fetch semua data anime berdasarkan daftar ID favorit
  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.length === 0) {
        setAnimeList([]);
        setLoading(false);
        return;
      }

      try {
        const results = await Promise.all(
          favorites.map((id) =>
            axios.get(`https://api.jikan.moe/v4/anime/${id}`)
          )
        );
        setAnimeList(results.map((res) => res.data.data));
      } catch (error) {
        console.error("Gagal mengambil data favorit:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  // 🔹 Hapus anime dari daftar favorit
  const removeFavorite = (id: number) => {
    const updated = favorites.filter((fav) => fav !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setAnimeList(animeList.filter((anime) => anime.mal_id !== id));
  };

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-6 max-w-6xl mx-auto">
      {/* 🔙 Navigasi */}
      <nav className="flex justify-between items-center mb-6">
        <Link
          href="/"
          className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm shadow hover:bg-pink-600 transition"
        >
          ⬅️ Kembali
        </Link>
        <h1 className="text-3xl font-bold text-pink-600">💖 Anime Favoritmu</h1>
      </nav>

      {/* Konten */}
      {loading ? (
        <p className="text-center text-gray-500 mt-10 animate-pulse">
          Memuat data favorit...
        </p>
      ) : animeList.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          Kamu belum menambahkan anime ke daftar favorit 😢
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-fade-in">
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

              {/* Tombol Hapus */}
              <button
                onClick={() => removeFavorite(anime.mal_id)}
                className="absolute top-2 right-2 bg-white text-pink-500 hover:text-pink-700 rounded-full p-1 text-lg shadow"
              >
                ❌
              </button>

              <div className="p-2">
                <h3 className="text-sm font-semibold text-pink-700 truncate">
                  {anime.title}
                </h3>
                <p className="text-xs text-pink-500">⭐ {anime.score || "N/A"}</p>
                <Link
                  href={`/anime/${anime.mal_id}`}
                  className="block mt-2 text-center bg-pink-500 text-white rounded-lg py-1 text-xs font-medium hover:bg-pink-600 transition"
                >
                  🎬 Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
