"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import ShimmerCard from "../../../components/ShimmerCard";

export default function GenrePage() {
  const { genre } = useParams();
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenreAnime = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime?genres=${genre}&limit=18&order_by=popularity`
        );
        setAnimeList(res.data.data);
      } catch (error) {
        console.error("Gagal mengambil data genre:", error);
      } finally {
        setLoading(false);
      }
    };

    if (genre) fetchGenreAnime();
  }, [genre]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-6 animate-bounce-slow capitalize">
        🎭 Genre: {genre}
      </h1>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      ) : animeList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-fade-in">
          {animeList.map((anime) => (
            <Link
              href={`/anime/${anime.mal_id}`}
              key={anime.mal_id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 overflow-hidden"
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
      ) : (
        <p className="text-center text-gray-500">Tidak ada anime untuk genre ini 😢</p>
      )}
    </main>
  );
}
