import "./globals.css";

export const metadata = {
  title: "AnimeID - Pencari Rekomendasi Anime",
  description: "Temukan anime favoritmu dengan gaya pink pastel 🌸",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-pink-50">{children}</body>
    </html>
  );
}
