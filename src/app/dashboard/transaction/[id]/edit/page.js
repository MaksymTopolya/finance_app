import React from "react";
import { createClient } from "@/utils/supabase/server";
import TransactionForm from "@/app/dashboard//components/transactionForm";
const Page = async ({ params: { id } }) => {
  const supabase = createClient();

  const { data: transaction, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) notFound();
  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Edit Transaction</h1>
      <TransactionForm initialData={transaction} />
    </>
  );
};

export default Page;
