"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";
import axios from "axios";

export default function WatchPage() {
  const { slug } = useParams();
  const [anime, setAnime] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔍 Ambil data anime berdasarkan slug (judul)
        const searchRes = await axios.get(
          `https://api.jikan.moe/v4/anime?q=${slug}&limit=1`
        );
        const animeData = searchRes.data.data[0];
        setAnime(animeData);

        // 📺 Ambil daftar episode
        const episodesRes = await axios.get(
          `https://api.jikan.moe/v4/anime/${animeData.mal_id}/episodes`
        );
        setEpisodes(episodesRes.data.data || []);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10 animate-pulse">
        Memuat data...
      </p>
    );

  if (!anime)
    return (
      <p className="text-center text-pink-500 mt-10">
        Anime tidak ditemukan 😢
      </p>
    );

  return (
    <main className="relative max-w-5xl mx-auto px-4 py-8 pb-24">
      {/* Judul */}
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-4">
        {anime.title}
      </h1>

      {/* 🎥 Player */}
      <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
        {selectedEpisode ? (
          <ReactPlayer
            url={selectedEpisode}
            width="100%"
            height="360px"
            controls
          />
        ) : anime.trailer?.url ? (
          <ReactPlayer url={anime.trailer.url} width="100%" height="360px" />
        ) : (
          <div className="bg-pink-100 text-center py-20 text-pink-500">
            Tidak ada trailer / video
          </div>
        )}
      </div>

      {/* 📝 Info Singkat */}
      <div className="bg-pink-50 p-4 rounded-xl shadow-inner mb-6">
        <p className="text-gray-700 mb-2">
          <strong>Episode:</strong> {anime.episodes || "?"}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Score:</strong> ⭐ {anime.score || "N/A"}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Status:</strong> {anime.status}
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          {anime.synopsis?.slice(0, 200)}...
        </p>
      </div>

      {/* 📚 Daftar Episode */}
      <h2 className="text-2xl font-semibold text-pink-600 mb-4">
        Daftar Episode
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {episodes.length > 0 ? (
          episodes.map((ep) => (
            <button
              key={ep.mal_id}
              onClick={() =>
                setSelectedEpisode(
                  ep.url || anime.trailer?.url || "https://youtu.be/dQw4w9WgXcQ"
                )
              }
              className="bg-pink-200 hover:bg-pink-300 text-pink-800 rounded-lg p-3 text-sm font-semibold shadow transition"
            >
              Ep {ep.mal_id}: {ep.title?.slice(0, 18) || "Episode"}
            </button>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            Tidak ada data episode 😅
          </p>
        )}
      </div>

      {/* 🎬 Tombol sticky */}
      <div className="fixed bottom-4 left-0 w-full flex justify-center z-50">
        <a
          href={`/watch/${anime.title.toLowerCase().replace(/\s+/g, "-")}`}
          className="bg-pink-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-pink-600 transition font-semibold animate-bounce-slow"
        >
          🎬 Tonton Sekarang
        </a>
      </div>
    </main>
  );
}            Tidak ada data episode 😅
          </p>
        )}
      </div>
    </main>
  );
}
