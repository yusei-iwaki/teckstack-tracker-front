"use server";

import { login, LoginRequest } from "@/api/auth/login";

export const stepLogin = async (params: LoginRequest) => {
  return login(params);
};
