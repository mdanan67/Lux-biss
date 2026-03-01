import { api } from "./api";

export async function login(email, password) {
  const res = await api.post("/auth/login", { email, password });

  const { access_token, refresh_token, user } = res.data.data;

  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
  localStorage.setItem("user", JSON.stringify(user));

  return res.data.data;
}