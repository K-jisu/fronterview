"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { successToast } from "../../../../shared/model/success-toast";

const SignInSuccessToast = () => {
  const searchParam = useSearchParams();
  useEffect(() => {
    const signInStatus = searchParam.get("signIn");

    if (signInStatus === "success") {
      successToast("Github 로그인에 성공했습니다!");

      const url = new URL(window.location.href);
      url.searchParams.delete("signIn");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParam]);
  return null;
};

export default SignInSuccessToast;
