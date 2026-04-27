"use server";

import { userRegister, UserRegisterRequest } from "@/api/user/register";

export const stepUserRegister = async (params: UserRegisterRequest) => {
  return userRegister(params);
};
