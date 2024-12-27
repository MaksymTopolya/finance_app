export const groupAndSumTransactionsByDate = (transactions) => {
  const groupedTransactions = {};
  for (const transaction of transactions) {
    const date = transaction.created_at.split("T")[0];

    if (!groupedTransactions[date]) {
      groupedTransactions[date] = { transactions: [], amount: 0 };
    }
    groupedTransactions[date].transactions.push(transaction);
    const amount =
      transaction.type === "Expense" ? -transaction.amount : transaction.amount;
    groupedTransactions[date].amount += amount;
  }

  return groupedTransactions;
};
