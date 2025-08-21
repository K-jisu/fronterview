"use server";
import UserMenu from "./user-menu";
import { createClient } from "../../../shared/api/supabase/server";
import NavigationTab from "./navigation-tab";

const Navbar = async () => {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();
  const email = user.user?.email;
  const name = user.user?.user_metadata.name;

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* 네이게이션 탭 */}
          <NavigationTab />
          {/* 계정 관련 */}
          <UserMenu email={email} name={name} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
