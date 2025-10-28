import { fetchJikan } from "../../../lib/api";

export default async function AnimeDetail({
  params,
}: {
  params: { id: string };
}) {
  // Ambil data dari Jikan API
  const data = await fetchJikan(`/anime/${params.id}/full`);
  const anime = data.data;

  if (!anime) {
    return (
      <main className="min-h-screen flex items-center justify-center text-pink-600 text-xl">
        ❌ Anime tidak ditemukan.
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-6 max-w-3xl mx-auto text-gray-800">
      {/* Judul */}
      <h1 className="text-3xl font-bold text-pink-600 mb-4 text-center">
        {anime.title}
      </h1>

      {/* Gambar utama */}
      <img
        src={anime.images?.jpg?.large_image_url}
        alt={anime.title}
        className="rounded-2xl shadow-lg mb-6 w-full"
      />

      {/* Info singkat */}
      <div className="bg-pink-100 rounded-xl p-4 shadow-inner space-y-2">
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
