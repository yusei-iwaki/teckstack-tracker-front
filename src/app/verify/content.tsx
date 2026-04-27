"use client";

import { stepVerify } from "@/server/step-process/step-verify";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Content() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get("token");

    if (!token) return;

    const result = stepVerify({ token });
    if (!result) {
      router.push("/user/login");
      return;
    }

    router.push("/member/dashboard");
  }, []);

  return <div>認証中...</div>;
}
