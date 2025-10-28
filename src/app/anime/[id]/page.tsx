"use client";

import { useEffect, useState } from "react";
import { fetchJikan } from "../../../lib/api";

export default function AnimeDetail({ params }: { params: { id: string } }) {
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // Ambil data dari Jikan API
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchJikan(`/anime/${params.id}/full`);
      setAnime(data.data);
      setLoading(false);
    };
    fetchData();
  }, [params.id]);

  // Cek apakah anime ini sudah ada di favorit
  useEffect(() => {
    if (anime) {
      const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
      setIsFavorite(stored.some((item: any) => item.mal_id === anime.mal_id));
    }
  }, [anime]);

  const toggleFavorite = () => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updated;

    if (isFavorite) {
      // Hapus dari favorit
      updated = stored.filter((item: any) => item.mal_id !== anime.mal_id);
    } else {
      // Tambahkan ke favorit
      const newFav = {
        mal_id: anime.mal_id,
        title: anime.title,
        image: anime.images.jpg.image_url,
        score: anime.score,
      };
      updated = [...stored, newFav];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  if (loading)
    return (
      <main className="text-center mt-10 text-gray-500 animate-pulse">
        Memuat data...
      </main>
    );

  if (!anime)
    return (
      <main className="text-center mt-10 text-pink-600">
        ❌ Anime tidak ditemukan.
      </main>
    );

  return (
    <main className="min-h-screen px-4 py-6 max-w-3xl mx-auto text-gray-800">
      {/* Judul */}
      <h1 className="text-3xl font-bold text-pink-600 mb-4 text-center">
        {anime.title}
      </h1>

      {/* Gambar */}
      <img
        src={anime.images?.jpg?.large_image_url}
        alt={anime.title}
        className="rounded-2xl shadow-lg mb-6 w-full"
      />

      {/* Tombol favorit */}
      <div className="flex justify-center mb-6">
        <button
          onClick={toggleFavorite}
          className={`px-5 py-2 rounded-full font-semibold shadow transition ${
            isFavorite
              ? "bg-pink-600 text-white hover:bg-pink-700"
              : "bg-pink-100 text-pink-700 hover:bg-pink-200"
          }`}
        >
          {isFavorite ? "💔 Hapus dari Favorit" : "💖 Tambah ke Favorit"}
        </button>
      </div>

      {/* Info singkat */}
      <div className="bg-pink-50 rounded-xl p-4 shadow-inner space-y-2">
        <p>
          <strong>Genre:</strong>{" "}
          {anime.genres?.map((g: any) => g.name).join(", ") || "-"}
        </p>
        <p>
          <strong>Episodes:</strong> {anime.episodes || "?"}
        </p>
        <p>
          <strong>Score:</strong> ⭐ {anime.score || "N/A"}
        </p>
        <p>
          <strong>Status:</strong> {anime.status || "Unknown"}
        </p>
        <p>
          <strong>Tahun:</strong> {anime.year || "?"}
        </p>
      </div>

      {/* Sinopsis */}
      <p className="text-gray-700 leading-relaxed mt-6">
        {anime.synopsis || "Tidak ada sinopsis untuk anime ini."}
      </p>

      {/* Trailer */}
      {anime.trailer?.youtube_id && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-pink-600 mb-3">
            Trailer 🎥
          </h2>
          <div className="aspect-video rounded-xl overflow-hidden shadow-md">
            <iframe
              src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
              title="Trailer Anime"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}

      {/* Tombol tonton */}
      <a
        href={`/watch/${anime.title.toLowerCase().replace(/\s+/g, "-")}`}
        className="inline-block mt-8 bg-pink-500 text-white px-5 py-3 rounded-xl shadow hover:bg-pink-600 transition"
      >
        🎬 Tonton Sekarang
      </a>
    </main>
  );
}
