"use client";
import React, { useEffect } from "react";
import TransactionItem from "./transactionItem";
import TransactionSummaryItem from "./transactionSummaryItem";
import Hr from "./hr";
import { groupAndSumTransactionsByDate } from "@/utils/functions";
import Button from "./button";
import { fetchTransactions } from "@/utils/actions";

const TransactionList = ({ initialTransactions, range }) => {
  const [transactions, setTransactions] = React.useState(initialTransactions);
  const [offset, setOffset] = React.useState(initialTransactions.length);
  const [btnHiden, setBtnHidden] = React.useState(
    initialTransactions.length === 0
  );
  const groupedTransactions = groupAndSumTransactionsByDate(transactions);

  const hadleClick = async () => {
    const newTransactions = await fetchTransactions(range, offset, 10);
    setTransactions((prev) => [...prev, ...newTransactions]);
  };

  return (
    <div className="space-y-8">
      {Object.entries(groupedTransactions).map(
        ([date, { transactions, amount }]) => (
          <div key={date}>
            <TransactionSummaryItem date={date} amount={amount} />
            <Hr />
            <section className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id}>
                  <TransactionItem {...transaction} />
                </div>
              ))}
            </section>
          </div>
        )
      )}
      {transactions.length === 0 && (
        <div className="text-center text-gray-400 dark:text-gray-500">
          No transactions
        </div>
      )}

      {!btnHiden && (
        <div className="flex justify-center">
          <Button variants="outline" sizes="sm" onClick={hadleClick}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
