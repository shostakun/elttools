import type { User } from "@/types";
import { computed, inject, onMounted, type Ref } from "vue";

const TOKEN_KEY = "elttoolstok";

export const useAuth = () => {
  const user = inject<Ref<User | null>>("user");
  const loggedIn = computed(() => user?.value?.token);

  const setToken = (token: string) => {
    if (!user) return;
    user.value = { ...user.value, token };
    localStorage.setItem(TOKEN_KEY, token);
  };

  const loadToken = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) setToken(token);
    // console.log("user:", user?.value);
    // console.log("protected route:", await api("admin/protected"));
  };

  onMounted(loadToken);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const api = async (route: string, data?: any, method?: string) => {
    const token = user?.value?.token;
    const opts = {
      ...(data ? { body: JSON.stringify(data), method: "post" } : {}),
      ...(method ? { method } : {}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
    };

    const res = await fetch(`http://127.0.0.1:8642/${route}`, opts);
    return await res.json();
  };

  const logIn = async (username: string, password: string) => {
    if (!user) return;

    const { token }: { token: string } = await api("login", {
      username: username,
      password: password,
    });

    if (token) setToken(token);
  };

  const logOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    if (user) user.value = null;
  };

  return {
    api,
    loggedIn,
    logIn,
    logOut,
    user,
  };
};
