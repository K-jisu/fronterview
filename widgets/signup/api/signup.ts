"use server";
import { createClient } from "../../../shared/api/supabase/server";

const signup = async (email: string, password: string) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.log(error);
    throw error;
  }
  console.log("회원가입 성공");
};

export default signup;
