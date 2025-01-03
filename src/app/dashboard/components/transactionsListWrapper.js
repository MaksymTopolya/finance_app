import React from "react";
import { fetchTransactions } from "@/utils/actions";
import TransactionList from "./transactionList";

const TransactionsListWrapper = async ({ range }) => {
  const transactions = await fetchTransactions(range);

  return (
    <TransactionList
      initialTransactions={transactions}
      key={range}
      range={range}
    />
  );
};

export default TransactionsListWrapper;
