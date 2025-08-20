"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../shared/api/supabase/client";
import { Button } from "@/components/ui/button";

type AuthUser = {
  email?: string | null;
  user_metadata?: Record<string, unknown> | null;
};

const UserMenu = () => {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getUser();
      if (!isMounted) return;
      setUser(data.user);
      setIsLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) return;
        setUser(session?.user ?? null);
      }
    );

    void init();

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="hidden md:flex items-center space-x-2">
        <Button variant="ghost" size="sm" disabled>
          Loading
        </Button>
        <Button size="sm" disabled>
          ...
        </Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="hidden md:flex items-center space-x-2">
        <Link href="/login">
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

  const displayName = user.email || "User";

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
