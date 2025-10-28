"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import ReactPlayer from "react-player";

export default function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        setAnime(res.data.data);
      } catch (err) {
        console.error("Gagal memuat data anime:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAnimeDetail();
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10 animate-pulse">
        Memuat data anime...
      </p>
    );

  if (!anime)
    return (
      <p className="text-center text-pink-500 mt-10">
        Anime tidak ditemukan 😢
      </p>
    );

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 bg-white/80 rounded-2xl shadow-lg backdrop-blur-md animate-fade-in">
      {/* 🌸 Judul */}
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-4">
        {anime.title}
      </h1>

      {/* 🌸 Poster */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="rounded-2xl shadow-md w-full md:w-1/3 object-cover"
        />

        {/* Info Singkat */}
        <div className="flex-1 bg-pink-50 p-4 rounded-xl shadow-inner space-y-3">
          <p>
            <strong>🎬 Episode:</strong> {anime.episodes || "?"}
          </p>
          <p>
            <strong>⭐ Skor:</strong> {anime.score || "N/A"}
          </p>
          <p>
            <strong>📅 Status:</strong> {anime.status}
          </p>
          <p>
            <strong>📢 Tipe:</strong> {anime.type}
          </p>
          <p>
            <strong>🕒 Durasi:</strong> {anime.duration}
          </p>
          <p>
            <strong>🏷️ Genre:</strong>{" "}
            {anime.genres.map((g: any) => g.name).join(", ")}
          </p>
          <a
            href={anime.url}
            target="_blank"
            className="inline-block bg-pink-500 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-600 transition"
          >
            🌐 Lihat di MyAnimeList
          </a>
        </div>
      </div>

      {/* 🌸 Sinopsis */}
      <div className="bg-pink-100 p-5 rounded-xl shadow-inner mb-8">
        <h2 className="text-2xl font-semibold text-pink-600 mb-3">
          📝 Sinopsis
        </h2>
        <p className="text-gray-700 leading-relaxed">{anime.synopsis}</p>
      </div>

      {/* 🌸 Trailer */}
      {anime.trailer?.url && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-pink-600 mb-3">
            🎥 Trailer
          </h2>
          <div className="rounded-xl overflow-hidden shadow-md aspect-video">
            <ReactPlayer
              url={anime.trailer.url}
              width="100%"
              height="100%"
              controls
            />
          </div>
        </div>
      )}

      {/* 🌸 Tombol tonton sekarang */}
      <div className="text-center mt-10">
        <Link
          href={`/watch/${anime.title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")}`}
          className="inline-block bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-pink-600 transition transform hover:scale-105"
        >
          🎬 Tonton Sekarang
        </Link>
      </div>
    </main>
  );
}
