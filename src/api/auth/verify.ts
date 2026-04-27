import { API_ROUTES } from "@/constants/api-route";
import { cookies } from "next/headers";

export type VerifyRequest = {
  token: string;
};

export const verify = async ({ token }: VerifyRequest) => {
  const res = await fetch(API_ROUTES.AUTH.VERIFY(token), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
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
