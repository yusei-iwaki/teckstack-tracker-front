import { API_ROUTES } from "@/constants/api-route";
import { cookies } from "next/headers";

export const getTags = async () => {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(API_ROUTES.TAG.LIST, {
    method: "GET",
    headers: {
      Cookie: `token=${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error();

  return await res.json();
};
