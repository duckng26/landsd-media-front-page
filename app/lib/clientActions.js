require("dotenv").config();

export const fetchNewsData = async (qs = "", isFreeText) => {
  const baseURL = process.env.NEXT_PUBLIC_NEWS_API_URL;
  const url = `${baseURL}GrpST_Src_GeoTag?${
    `is_free_text=` + !!isFreeText + (isFreeText ? (`&query=` + isFreeText) : '') + `&`
  }${decodeURIComponent(qs)}`;
  const token = ``; // TODO: remove when auth implemented
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const response = await fetch(url, {
      headers,
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

export async function updateNewsLocation(
  id_source,
  lst_id_geo_tag_remain,
  lst_loc_new
) {
  const baseURL = process.env.NEXT_PUBLIC_NEWS_API_URL;
  const endpoint = "location";

  const params = new URLSearchParams();
  if (id_source) params.append("id_source", id_source.toString());
  // if (collectionName) params.append('collection_name', collectionName);
  // if (limit) params.append('limit', limit);

  const qs = params.toString();
  const requestBody = {
    lst_id_geo_tag_remain: lst_id_geo_tag_remain,
    lst_loc_new: lst_loc_new,
  };

  const url = `${baseURL}${endpoint}?${qs}`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Update successful:", data);
  } catch (error) {
    console.error("Error updating news location:", error);
  }
}

export const fetchProfiles = async () => {
  const baseURL = process.env.NEXT_PUBLIC_PROFILE_API_URL;
  const url = `${baseURL}`;
  const token = ``; // TODO: remove when auth implemented
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const response = await fetch(url, {
      headers,
    });
    if (!response.ok) {
      throw new Error("Failed to fetch profiles");
    }
    const data = await response.json();
    return data.data.lst_profile;
  } catch (error) {
    console.error("Error fetching profiles data:", error.message);
    throw error;
  }
};
