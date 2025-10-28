import axios from "axios";

const JIKAN_BASE = "https://api.jikan.moe/v4";

export async function fetchJikan(endpoint: string) {
  try {
    const res = await axios.get(`${JIKAN_BASE}${endpoint}`);
    return res.data;
  } catch (err) {
    console.error("Gagal ambil data dari Jikan:", err);
    return { data: [] };
  }
}
