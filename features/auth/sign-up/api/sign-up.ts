"use server";
import { createClient } from "../../../../shared/api/supabase/server";

type FormData = {
  email: string;
  password: string;
  name: string;
};

const signup = async (formData: FormData) => {
  const supabase = await createClient();
  const { email, password, name } = formData;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  if (error) {
    console.log(error);
    throw error;
  }
  return { data, error };
};

export default signup;
