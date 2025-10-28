"use client";

import Link from "next/link";

const genreList = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 4, name: "Comedy" },
  { id: 8, name: "Drama" },
  { id: 10, name: "Fantasy" },
  { id: 22, name: "Romance" },
  { id: 24, name: "Sci-Fi" },
  { id: 30, name: "Sports" },
  { id: 37, name: "Supernatural" },
];

export default function GenreMenu() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8 min-h-screen text-center">
      <h1 className="text-3xl font-bold text-pink-600 mb-6 animate-bounce-slow">
        🎀 Pilih Genre Anime
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {genreList.map((g) => (
          <Link
            key={g.id}
            href={`/genre/${g.id}`}
            className="bg-pink-200 hover:bg-pink-300 text-pink-800 font-semibold py-3 rounded-xl shadow transition transform hover:-translate-y-1"
          >
            {g.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
