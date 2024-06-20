require('dotenv').config();

export const fetchNewsData = async (qs = "") => {
  const baseURL = process.env.NEXT_PUBLIC_NEWS_API_URL;
  const url = `${baseURL}GrpST_Src_GeoTag?${decodeURIComponent(qs)}`;
  const token = ``; // TODO: remove when auth implemented
  const headers = { 'Authorization': `Bearer ${token}` }

  try {
    const response = await fetch(url, {
      headers
    });
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


export const freeTextSearch = async (query) => {
  const baseURL = process.env.NEXT_PUBLIC_NEWS_API_URL;
  const endpoint = "free_text_search";
  const token = ``; // TODO: remove when auth implemented
  const headers = { 'Authorization': `Bearer ${token}` }

  const params = new URLSearchParams();
  if (query) params.append('query', query);
  // if (collectionName) params.append('collection_name', collectionName);
  // if (limit) params.append('limit', limit);

  const qs = params.toString();
  const url = `${baseURL}${endpoint}?${qs}`;

  try {
    const response = await fetch(url, {
      headers
    });
    if (!response.ok) {
      throw new Error("Failed to perform free text search");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error performing free text search:", error.message);
    throw error;
  }
};
