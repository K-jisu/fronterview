"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import signOut from "../../../features/auth/sign-out/api/sign-out";
import { successToast } from "../../../shared/model/success-toast";
import { useRouter } from "next/navigation";

type UserMenuProps = {
  email: string | undefined;
  name: string | undefined;
};

const UserMenu = ({ email, name }: UserMenuProps) => {
  const router = useRouter();
  const handleLogout = async () => {
    const signOutError = await signOut();
    if (signOutError) {
      successToast("로그아웃에 실패했습니다.");
    } else {
      successToast("로그아웃에 성공했습니다.");
    }
    router.push("/");
  };

  if (!email && !name) {
    return (
      <div className="hidden md:flex items-center space-x-2">
        <Link href="/signin">
          <Button variant="ghost" size="sm">
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button size="sm">Sign Up</Button>
        </Link>
      </div>
    );
  }

  const displayName = name || email || "User";

  return (
    <div className="hidden md:flex items-center space-x-2">
      <span className="text-sm text-gray-600">{displayName}</span>
      <Button variant="ghost" size="sm" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default UserMenu;
