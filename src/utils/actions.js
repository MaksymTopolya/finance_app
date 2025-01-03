"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { createClient } from "./supabase/server";
import { transactionSchema } from "./zod";
import { delay } from "./delay";
import { redirect } from "next/navigation";

export async function revalidate() {
  revalidateTag("transaction-list");
}

export async function createTransaction(formData) {
  const validated = transactionSchema.safeParse(formData);
  console.log(validated);
  if (!validated.success) {
    throw new Error(validated.error.issues[0].message);
  }
  const { error } = await createClient().from("transactions").insert(formData);

  if (error) {
    throw new Error("Something went wrong");
  }
  revalidatePath("/dashboard");
}

export async function fetchTransactions(range, offset = 0, limit = 10) {
  const supabase = createClient();
  let { data, error } = await supabase.rpc("fetch_transactions", {
    limit_arg: limit,
    offset_arg: offset,
    range_arg: range,
  });
  if (error) throw new Error("We can't fetch transactions");
  return data;
}

export const deleteTransaction = async (id) => {
  const supabase = createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw new Error("Something went wrong");
};

export async function updateTransaction(id, formData) {
  const validated = transactionSchema.safeParse(formData);
  if (!validated.success) {
    throw new Error("Invalid data");
  }
  const { error } = await createClient()
    .from("transactions")
    .update(formData)
    .eq("id", id);
  if (error) {
    throw new Error("Failed creating the transaction");
  }
  revalidatePath("/dashboard");
}

export async function login(prevState, formData) {
  const supabase = createClient();
  const email = formData.get("email");

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) return { message: "Failed", error: true };

  return { message: `Email sent to ${email}` };
}

export const logOut = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error("Something went wrong");
  redirect("/login");
};
