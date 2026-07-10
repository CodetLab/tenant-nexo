import api from "../api/client";

import type {
  LoginInput,
  RegisterInput,
  AuthResponse,
} from "../types/auth.types";

export async function register(
  data: RegisterInput
): Promise<AuthResponse> {
  const res = await api.post(
    "/auth/register",
    data
  );

  return res.data;
}

export async function login(
  data: LoginInput
): Promise<AuthResponse> {
  const res = await api.post(
    "/auth/login",
    data
  );

  return res.data;
}



export const verifyEmail = (token: string) => {
  return api.post("/auth/verify-email", {
    token,
  });
};