"use server";

import { createClient } from "../../../../shared/api/supabase/server";
import { redirect } from "next/navigation";

export const signInWithEmail = async (email: string, password: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error);
    throw error;
  }
  return { data, error };
};

export const signInWithGitHub = async () => {
  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    console.error("signInWithGitHub: NEXT_PUBLIC_SITE_URL is not set");
    throw new Error("Environment variable NEXT_PUBLIC_SITE_URL is not set");
  }
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: new URL(`/auth/callback`, siteUrl).toString(),
    },
  });

  if (error) {
    console.error(error);
    throw error;
  }

  if (data.url) {
    redirect(data.url);
  }
};
