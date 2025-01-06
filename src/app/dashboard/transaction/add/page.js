import React from "react";

import TransactionForm from "@/app/dashboard/components/transactionForm";

const Page = () => {
  return (
    <>
      <h1 className="text-4xl mb-4 font-semibold">Add Transaction</h1>
      <TransactionForm />
    </>
  );
};

export default Page;
