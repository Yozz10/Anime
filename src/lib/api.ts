import axios from "axios";

const JIKAN_BASE = "https://api.jikan.moe/v4";

/**
 * Fetch data dari Jikan API
 * @param endpoint contoh: /anime/1, /top/anime, /anime?q=naruto
 */
export async function fetchJikan(endpoint: string) {
  try {
    const res = await axios.get(`${JIKAN_BASE}${endpoint}`);
    return res.data;
  } catch (err) {
    console.error("❌ Gagal ambil data dari Jikan API:", err);
    return { data: [] };
  }
}
