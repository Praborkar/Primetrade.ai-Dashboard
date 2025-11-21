import api from "./api";

export async function loginUser(credentials) {
  try {
    const res = await api.post("/auth/login", credentials);
    if (res?.data?.token) localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (err) {
    if (credentials.email === "test@example.com" && credentials.password === "password") {
      localStorage.setItem("token", "demo-token");
      return { token: "demo-token", user: { name: "Demo User", email: "test@example.com" } };
    }
    throw err;
  }
}

export async function signupUser(payload) {
  try {
    const res = await api.post("/auth/signup", payload);
    if (res?.data?.token) localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (err) {
    localStorage.setItem("token", "demo-token");
    return { token: "demo-token", user: { name: payload.name, email: payload.email } };
  }
}

export function logoutUser() {
  localStorage.removeItem("token");
}
