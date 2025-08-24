"use server";
import { createClient } from "../../../../shared/api/supabase/server";

const signOut = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  return error;
};

export default signOut;
