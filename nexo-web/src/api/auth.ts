import api from "../api/client";

export type LoginInput = {
  email: string;
  password: string;
};

export async function login({ email, password }: LoginInput) {
  const res = await api.post("/auth/login", {
    email,
    password,
  });

  return res.data;
}
export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export async function register({
  name,
  email,
  password,
}: RegisterInput) {
  const res = await api.post("/auth/register", {
    name,
    email,
    password,
  });

  return res.data;
}