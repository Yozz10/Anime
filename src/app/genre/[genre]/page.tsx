"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function GenrePage() {
  const { genre } = useParams();
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchByGenre = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime?genres=${encodeURIComponent(
            genre as string
          )}&limit=18&order_by=popularity`
        );
        setAnimeList(res.data.data || []);
      } catch (err) {
        console.error("Gagal memuat genre:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchByGenre();
  }, [genre]);

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center capitalize">
        🌸 Genre: {genre}
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Memuat...</p>
      ) : animeList.length === 0 ? (
        <p className="text-center text-pink-500">Tidak ada anime di genre ini 😢</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {animeList.map((anime) => (
            <Link
              key={anime.mal_id}
              href={`/anime/${anime.mal_id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden relative"
            >
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-semibold text-pink-700 truncate">
                  {anime.title}
                </h3>
                <p className="text-xs text-pink-500">⭐ {anime.score || "N/A"}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
