export default function Loading() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-pink-50 text-pink-500 animate-fade-in">
      <div className="w-12 h-12 border-4 border-pink-300 border-t-pink-500 rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-semibold animate-pulse">
        🌸 Sedang memuat data anime...
      </p>
    </main>
  );
}
