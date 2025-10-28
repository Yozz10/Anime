"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function GenrePage() {
  const [genres, setGenres] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get("https://api.jikan.moe/v4/genres/anime");
        setGenres(res.data.data);
      } catch (err) {
        console.error("Gagal memuat genre:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);

  return (
    <main className="min-h-screen px-4 py-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-8">
        🌸 Daftar Genre Anime 🌸
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">
          Memuat daftar genre...
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 animate-fade-in">
          {genres.map((genre) => (
            <Link
              key={genre.mal_id}
              href={`/genre/${genre.mal_id}`}
              className="bg-pink-100 hover:bg-pink-200 text-pink-800 font-semibold rounded-xl shadow p-4 text-center transition transform hover:-translate-y-1"
            >
              {genre.name}
              <span className="block text-sm text-gray-500 mt-1">
                {genre.count} anime
              </span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
