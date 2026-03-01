import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// main axios instance used everywhere
export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// token helpers
const tokenStorage = {
  getAccessToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
  },
  getRefreshToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("refresh_token");
  },
  setTokens(accessToken, refreshToken) {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
  },
  setAccessToken(accessToken) {
    localStorage.setItem("access_token", accessToken);
  },
  clear() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};

// attach access token on every request
api.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let queue = [];

function processQueue(error, newAccessToken = null) {
  queue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(newAccessToken);
  });
  queue = [];
}

// auto refresh on 401, then retry original request
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If refresh already in progress, wait
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then((newAccessToken) => {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = tokenStorage.getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        // 🔥 THIS is your refresh endpoint call
        const refreshRes = await axios.post(
          `${BASE_URL}/auth/refresh`,
          { refresh_token: refreshToken }, // some backends expect refresh_token, not refreshToken
          { headers: { "Content-Type": "application/json" } }
        );

        // adjust to your backend response format:
        // ideally it returns same shape: { data: { access_token, refresh_token? } }
        const newAccessToken = refreshRes.data?.data?.access_token || refreshRes.data?.access_token;
        const newRefreshToken = refreshRes.data?.data?.refresh_token || refreshRes.data?.refresh_token;

        if (!newAccessToken) throw new Error("Refresh did not return access token");

        tokenStorage.setAccessToken(newAccessToken);
        if (newRefreshToken) localStorage.setItem("refresh_token", newRefreshToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        tokenStorage.clear();
        // optional: redirect to login
        // window.location.href = "/login";
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);