import React from "react";
import useFormatedCurrency from "@/hooks/useFormatedCurrency";

const TransactionSummaryItem = ({ amount, date }) => {
  const formatedCurency = useFormatedCurrency(amount);
  return (
    <div className="flex text-xl text-gray-600 dark:text-gray-400 font-semibold mb-6">
      <div className="grow">{date}</div>

      <div className="min-w-[70px] text-right font-semibold">
        {formatedCurency}
      </div>
    </div>
  );
};

export default TransactionSummaryItem;
