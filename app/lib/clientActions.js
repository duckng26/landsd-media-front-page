require('dotenv').config();

export const fetchNewsData = async (qs = "") => {
  const baseURL = process.env.NEXT_PUBLIC_NEWS_API_URL;
  const url = `${baseURL}?${decodeURIComponent(qs)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch news data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news data:", error.message);
    throw error;
  }
};
