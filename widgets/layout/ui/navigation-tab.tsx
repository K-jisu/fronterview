"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationTab = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/questions", label: "Questions" },
    { href: "/flashcards", label: "Flashcards" },
    { href: "/mypage", label: "My Page" },
  ];

  const isActive = (href: string) => pathname === href;
  return (
    <>
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
          <Button
            key={item.href}
            asChild
            variant={isActive(item.href) ? "default" : "ghost"}
            size="sm"
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
      </div>
    </>
  );
};

export default NavigationTab;
