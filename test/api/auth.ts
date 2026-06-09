import api from "./client";

export type LoginInput = {
  email: string;
  password: string;
  appSlug: string;
};

export async function login({ email, password, appSlug }: LoginInput) {
  const res = await api.post("/auth/login", {
    email,
    password,
    appSlug,
  });

  return res.data;
}
export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  appSlug: string;
};

export async function register({
  name,
  email,
  password,
  appSlug,
}: RegisterInput) {
  const res = await api.post("/auth/register", {
    name,
    email,
    password,
    appSlug,
  });

  return res.data;
}