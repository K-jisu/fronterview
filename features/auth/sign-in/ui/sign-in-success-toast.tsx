"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { successToast } from "../../../../shared/model/success-toast";

export default function SignInSuccessToast() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firedRef = useRef(false);

  const signInStatus = searchParams.get("signIn");

  useEffect(() => {
    if (signInStatus !== "success") return;
    if (firedRef.current) return; // StrictMode 중복 방지

    firedRef.current = true;
    successToast("Github 로그인에 성공했습니다!");

    // signInStatus 파라미터 제거 후 URL 정리
    const next = new URLSearchParams(searchParams);
    next.delete("signIn");

    // 쿼리가 비면 순수 pathname으로, 아니면 새 쿼리로
    const nextUrl = next.toString()
      ? `${pathname}?${next.toString()}`
      : pathname;

    router.replace(nextUrl);
  }, [signInStatus, router, pathname, searchParams]);

  return null;
}
