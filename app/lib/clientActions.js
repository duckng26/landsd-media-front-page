import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

require("dotenv").config();

// AUTH
export const login = async (body) => {
    const url = process.env.NEXT_PUBLIC_API_ROOT_URL + "access_control/token";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body,
        });
        if (!response.ok) {
            throw new Error("Failed to fetch login data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching login data:", error.message);
        throw error;
    }
};

export const getCurrentUser = async () => {
    const url = process.env.NEXT_PUBLIC_API_ROOT_URL + "access_control/whoami";

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + getCookie("token"),
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch current user data");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching current user data:", error.message);
        throw error;
    }
};

export const getUserConsentedRecently = async (qs) => {
    let url =
        process.env.NEXT_PUBLIC_API_ROOT_URL +
        "access_control/last_disclaimer_confirmation_tracker";

    url = `${url}?${decodeURIComponent(qs)}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + getCookie("token"),
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch user consent data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user consent data:", error.message);
        throw error;
    }
};

export const updateUserConsentTime = async () => {
    let url =
        process.env.NEXT_PUBLIC_API_ROOT_URL +
        "access_control/last_disclaimer_confirmation_time/update";

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + getCookie("token"),
            },
        });
        if (!response.ok) {
            throw new Error("Failed to update user consent data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating user consent data:", error.message);
        throw error;
    }
};

export const getLogs = async (qs = "") => {
    let url = process.env.NEXT_PUBLIC_API_ROOT_URL + "audit/logs";

    url = `${url}?${decodeURIComponent(qs)}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + getCookie("token"),
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch logs");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching logs:", error.message);
        throw error;
    }
};

export const authLogin = async () => {
    let url = process.env.NEXT_PUBLIC_API_WINDOW_LOGIN;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to authorize login");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to authorize login: ", error.message);
        throw error;
    }
};

export const windowLogin = async (token) => {
    let url =
        process.env.NEXT_PUBLIC_API_ROOT_URL + "access_control/token_window";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                access_token: token,
            }),
        });
        if (!response.ok) {
            throw new Error("Failed to login with provided token");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to login with provided token:", error.message);
        throw error;
    }
};

// KEYWORD DATA
export const fetchCoreKeywordData = async (qs = "") => {
    const request_url = process.env.NEXT_PUBLIC_API_ROOT_URL + "keyword/core";

    const url = `${request_url}?${decodeURIComponent(qs)}`;
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error("Failed to fetch core keyword data");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching keyword data:", error.message);
        throw error;
    }
};

export const fetchTrendingKeywordData = async (qs = "") => {
    const request_url =
        process.env.NEXT_PUBLIC_API_ROOT_URL + "keyword/trending";

    const url = `${request_url}?${decodeURIComponent(qs)}`;
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error("Failed to fetch trending keyword data");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching trending keyword data:", error.message);
        throw error;
    }
};

export const fetchSuggestedKeywordData = async (qs = "") => {
    const request_url =
        process.env.NEXT_PUBLIC_API_ROOT_URL + "keyword/suggested";

    const url = `${request_url}?${decodeURIComponent(qs)}`;
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error("Failed to fetch suggested keyword data");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching suggested keyword data:", error.message);
        throw error;
    }
};

export const deleteKeyword = async (qs) => {
    const request_url = process.env.NEXT_PUBLIC_API_ROOT_URL + "keyword/delete";

    const url = `${request_url}?${decodeURIComponent(qs)}`;
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(url, { headers, method: "DELETE" });
        if (!response.ok) {
            throw new Error("Failed to delete keyword");
        }
        return response.ok;
    } catch (error) {
        console.error("Error deleting:", error.message);
        throw error;
    }
};

export const createKeyword = async (data) => {
    const url = process.env.NEXT_PUBLIC_API_ROOT_URL + "keyword/create";
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("Failed to create keyword");
        }
        return response.ok;
    } catch (error) {
        console.error("Error creating:", error.message);
    }
};

export const updateSuggestedKeyword = async (qs = "") => {
    const request_url =
        process.env.NEXT_PUBLIC_API_ROOT_URL + "keyword/suggested/update";

    const url = `${request_url}?${decodeURIComponent(qs)}`;
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(url, {
            headers,
            method: "PUT",
        });
        if (!response.ok) {
            throw new Error("Failed to update suggested keyword");
        }

        return response.ok;
    } catch (error) {
        console.error("Error updaeting:", error.message);
    }
};

// TOPICS DATA

export const fetchTopicsData = async () => {
    const url = process.env.NEXT_PUBLIC_API_ROOT_URL + "topics";
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error("Failed to fetch topics data");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching topics data:", error.message);
        throw error;
    }
};

export const deleteTopic = async (qs) => {
    const request_url = process.env.NEXT_PUBLIC_API_ROOT_URL + "topics/delete";

    const url = `${request_url}?${decodeURIComponent(qs)}`;
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(url, { headers, method: "DELETE" });
        if (!response.ok) {
            throw new Error("Failed to delete topic");
        }
        return response.ok;
    } catch (error) {
        console.error("Error deleting:", error.message);
        throw error;
    }
};

export const createTopics = async (data) => {
    const url = process.env.NEXT_PUBLIC_API_ROOT_URL + "topics/create";
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("Failed to create topic");
        }
        return response.ok;
    } catch (error) {
        console.error("Error creating:", error.message);
    }
};

export const updateTopics = async (qs = "") => {
    const request_url = process.env.NEXT_PUBLIC_API_ROOT_URL + "topics/update";

    const url = `${request_url}?${decodeURIComponent(qs)}`;
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(url, {
            headers,
            method: "PUT",
        });
        if (!response.ok) {
            throw new Error("Failed to update topic");
        }

        return response.ok;
    } catch (error) {
        console.error("Error updating:", error.message);
    }
};

// EVENTS DATA
export const fetchEventsData = async () => {
    const request_url = process.env.NEXT_PUBLIC_API_ROOT_URL + "events";
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(request_url, { headers });
        if (!response.ok) {
            throw new Error("Failed to fetch events data");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching events data:", error.message);
        throw error;
    }
};

export const deleteEvent = async (qs) => {
    const request_url = process.env.NEXT_PUBLIC_API_ROOT_URL + "events/delete";

    const url = `${request_url}?${decodeURIComponent(qs)}`;
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(url, { headers, method: "DELETE" });
        if (!response.ok) {
            throw new Error("Failed to delete event");
        }
        return response.ok;
    } catch (error) {
        console.error("Error deleting:", error.message);
        throw error;
    }
};

export const createEvents = async (data) => {
    const url = process.env.NEXT_PUBLIC_API_ROOT_URL + "events/create";
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("Failed to create event");
        }
        return response.ok;
    } catch (error) {
        console.error("Error creating:", error.message);
    }
};

export const updateEvents = async (qs = "") => {
    const request_url = process.env.NEXT_PUBLIC_API_ROOT_URL + "events/update";

    const url = `${request_url}?${decodeURIComponent(qs)}`;
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(url, {
            method: "PUT",
        });
        if (!response.ok) {
            throw new Error("Failed to update event");
        }

        return response.ok;
    } catch (error) {
        console.error("Error updating:", error.message);
    }
};

// OVERRIDING LIST DATA

export const fetchOverridingListData = async (qs = "") => {
    const baseURL =
        process.env.NEXT_PUBLIC_API_ROOT_URL +
        "access_management/overriding_record/list";
    const url = `${baseURL}?${decodeURIComponent(qs)}`;
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await fetch(url, {
            headers,
        });
        if (!response.ok) {
            throw new Error("Failed to fetch overriding list data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching overriding list data:", error.message);
        throw error;
    }
};

export const createOverridingRecord = async (qs = "") => {
    const baseURL =
        process.env.NEXT_PUBLIC_API_ROOT_URL +
        "access_management/overriding_record/create";
    const url = `${baseURL}?${decodeURIComponent(qs)}`;
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(url, {
            headers,
            method: "POST",
        });
        if (!response.ok) {
            throw new Error("Failed to create overriding list data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating overriding list data:", error.message);
        throw error;
    }
};

export const deleteOverridingRecord = async (qs = "") => {
    const baseURL =
        process.env.NEXT_PUBLIC_API_ROOT_URL +
        "access_management/overriding_record/delete";
    const url = `${baseURL}?${decodeURIComponent(qs)}`;
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers,
        });
        if (!response.ok) {
            throw new Error("Failed to delete user data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting user data:", error.message);
        throw error;
    }
};

export const updateOverridingRecord = async (qs = "") => {
    const baseURL =
        process.env.NEXT_PUBLIC_API_ROOT_URL +
        "access_management/overriding_record/update";
    const url = `${baseURL}?${decodeURIComponent(qs)}`;
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        console.log(url);
        const response = await fetch(url, {
            headers,
            method: "PUT",
        });
        if (!response.ok) {
            throw new Error("Failed to update overriding list data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating overriding list data:", error.message);
        throw error;
    }
};

// USER DATA

export const createUser = async (body) => {
    const url =
        process.env.NEXT_PUBLIC_API_ROOT_URL + "access_management/user/create";
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(url, {
            headers,
            method: "POST",
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error("Failed to create user ");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating user:", error.message);
        throw error;
    }
};

export const fetchUsers = async (qs = "") => {
    const baseURL =
        process.env.NEXT_PUBLIC_API_ROOT_URL + "access_management/user/list";
    const url = `${baseURL}?${decodeURIComponent(qs)}`;
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await fetch(url, {
            headers,
        });
        if (!response.ok) {
            throw new Error("Failed to fetch overriding list data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching overriding list data:", error.message);
        throw error;
    }
};

export const exportUserList = async () => {
    const url =
        process.env.NEXT_PUBLIC_API_ROOT_URL +
        "access_management/export_user_list";
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "text/csv",
    };

    try {
        const response = await fetch(url, {
            method: "GET",
            headers,
        });
        if (!response.ok) {
            throw new Error("Failed to export user list data");
        }
        const blob = await response.blob();

        // download csv
        const a = document.createElement("a");
        const href = window.URL.createObjectURL(blob); // 下载链接
        a.href = href;
        const fileName = response.headers
            .get("Content-Disposition")
            .split(";")[1]
            .split("=")[1];
        a.download = fileName.replaceAll('"', "").replaceAll("'", ""); // 获取后台设置的文件名称
        document.body.appendChild(a);
        a.click(); // 点击下载
        document.body.removeChild(a); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象

        return blob;
    } catch (error) {
        console.error("Error exporting user list data:", error.message);
        throw error;
    }
};

export const deleteUser = async (qs = "") => {
    const baseURL =
        process.env.NEXT_PUBLIC_API_ROOT_URL + "access_management/user/delete";
    const url = `${baseURL}?${decodeURIComponent(qs)}`;
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers,
        });
        if (!response.ok) {
            throw new Error("Failed to delete user data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting user data:", error.message);
        throw error;
    }
};

export const updateUser = async (body) => {
    const url =
        process.env.NEXT_PUBLIC_API_ROOT_URL + "access_management/user/update";
    const token = getCookie("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(url, {
            headers,
            method: "PUT",
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error("Failed to update user ");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating user:", error.message);
        throw error;
    }
};


// NEWS DATA
export const fetchNewsData = async (qs = "", isFreeText) => {
  const baseURL = process.env.NEXT_PUBLIC_API_ROOT_URL + 'news/GrpST_Src_GeoTag';
  const url = `${baseURL}?${
    `is_free_text=` + !!isFreeText + (isFreeText ? (`&query=` + isFreeText) : '') + `&`
  }${decodeURIComponent(qs)}`;
  const token = getCookie("token");
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
  const baseURL = process.env.NEXT_PUBLIC_API_ROOT_URL + 'news/location/';
  const endpoint = "location";
  const token = getCookie("token");

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
        Authorization: `Bearer ${token}` 
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

//PROFILES
export const fetchProfiles = async () => {
  const baseURL = process.env.NEXT_PUBLIC_API_ROOT_URL + 'profile';
  const url = `${baseURL}`;
  const token = getCookie("token");
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
