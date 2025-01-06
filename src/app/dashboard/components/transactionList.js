"use client";
import React from "react";
import TransactionItem from "./transactionItem";
import TransactionSummaryItem from "./transactionSummaryItem";
import Hr from "@/app/components/hr";
import { groupAndSumTransactionsByDate } from "@/utils/functions";
import Button from "@/app/components/button";
import { fetchTransactions } from "@/utils/actions";
import { Loader } from "lucide-react";

const TransactionList = ({ initialTransactions, range }) => {
  const [transactions, setTransactions] = React.useState(initialTransactions);

  const [btnHiden, setBtnHidden] = React.useState(
    initialTransactions.length === 0
  );
  const [loading, setLoading] = React.useState(false);
  const groupedTransactions = groupAndSumTransactionsByDate(transactions);

  const hadleClick = async () => {
    setLoading(true);
    let newTransactions = [];
    try {
      newTransactions = await fetchTransactions(range, transactions.length, 10);
      setBtnHidden(newTransactions.length === 0);

      setTransactions((prev) => [...prev, ...newTransactions]);
    } finally {
      setLoading(false);
    }
  };
  const handleRemoved = (id) => () => {
    setTransactions((prev) => [...prev].filter((t) => t.id !== id));
    window.location.reload();
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
                  <TransactionItem
                    {...transaction}
                    onRemoved={handleRemoved(transaction.id)}
                  />
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
          <Button
            variants="outline"
            sizes="base"
            onClick={hadleClick}
            disabled={loading}
          >
            {loading && <Loader className="animate-spin" />}
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
