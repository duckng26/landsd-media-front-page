export const fetchNewsData = async () => {
    try {
      const response = await fetch("http://18.166.215.35/news/GrpST_Src_GeoTag");
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
  