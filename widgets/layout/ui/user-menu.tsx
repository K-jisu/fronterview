"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import signOut from "../../../features/auth/sign-out/api/sign-out";

type UserMenuProps = {
  email: string | undefined;
  name: string | undefined;
};

const UserMenu = ({ email, name }: UserMenuProps) => {
  const handleLogout = async () => {
    signOut();
  };

  if (!email && !name) {
    return (
      <div className="hidden md:flex items-center space-x-2">
        <Link href="signin">
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
