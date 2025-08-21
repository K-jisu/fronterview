"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../../../../shared/api/supabase/server";
import { redirect } from "next/navigation";

const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
};

export default signOut;
