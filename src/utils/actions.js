"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { createClient } from "./supabase/server";
import { transactionSchema } from "./zod";

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
