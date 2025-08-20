"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "../../features/auth/user-menu/ui/user-menu";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/questions", label: "Questions" },
    { href: "/flashcards", label: "Flashcards" },
    { href: "/mypage", label: "My Page" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={"/code-icon.png"}
              alt="FronterView Logo"
              width={30}
              height={30}
              priority
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="text-lg font-semibold">FronterView</span>
          </Link>

          {/* 네비게이션 */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive(item.href) ? "default" : "ghost"}
                  size="sm"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* 계정 관련 */}
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
