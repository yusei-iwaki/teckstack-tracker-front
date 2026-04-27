"use server";

import { verify, VerifyRequest } from "@/api/auth/verify";

export const stepVerify = async (params: VerifyRequest) => {
  return verify(params);
};
