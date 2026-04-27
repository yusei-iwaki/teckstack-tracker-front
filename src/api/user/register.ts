import { API_ROUTES } from "@/constants/api-route";

export type UserRegisterRequest = {
  email: string;
  password: string;
};
export const userRegister = async ({
  email,
  password,
}: UserRegisterRequest) => {
  const res = await fetch(API_ROUTES.USER.CREATE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) false;

  return true;
};
