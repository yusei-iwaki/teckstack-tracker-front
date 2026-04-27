import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isMemberPage = request.nextUrl.pathname.startsWith("/member");
  const isAuthPage = request.nextUrl.pathname.startsWith("/user");

  if (isMemberPage && !token) {
    return NextResponse.redirect(new URL("/user/login", request.url));
  }

  // ログイン済みでログインページ行ったら弾く（任意）
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/member/dashboard", request.url));
  }

  return NextResponse.next();
}
