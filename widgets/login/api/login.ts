"use server";

import { createClient } from "../../../shared/api/supabase/server";

const loginWithEmail = async (email: string, password: string) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error);
    throw error;
  }
  console.log("로그인 성공");
};

export default loginWithEmail;
