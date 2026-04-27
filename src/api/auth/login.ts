import { API_ROUTES } from "@/constants/api-route";
import { cookies } from "next/headers";

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: LoginRequest) => {
  const res = await fetch(API_ROUTES.AUTH.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) return false;

  const data = await res.json();

  const cookieStore = await cookies();

  cookieStore.set("token", data.token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60,
  });

  return true;
};
