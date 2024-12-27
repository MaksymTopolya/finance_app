import React, { use } from "react";
import { Wallet, Landmark, HandCoins, PiggyBank } from "lucide-react";
import useFormatedCurrency from "@/hooks/useFormatedCurrency";
const TransactionItem = ({ type, category, amount }) => {
  const typesMap = {
    Income: {
      color: "text-green-600 dark:text-green-400",
      icon: HandCoins,
    },
    Expense: {
      color: "text-red-600 dark:text-red-400",
      icon: Wallet,
    },
    Saving: {
      color: "text-yellow-600 dark:text-yellow-400",
      icon: Landmark,
    },
    Investment: {
      color: "text-blue-600 dark:text-blue-400",
      icon: PiggyBank,
    },
  };

  const Icon = typesMap[type].icon;
  const color = typesMap[type].color;
  const formatedCurrency = useFormatedCurrency(amount);

  return (
    <div className="flex w-full items-center">
      <div className="flex items-center mr-4 grow">
        <Icon className={`w-6 h-6 ${color} mr-5`} />
        <span>{type}</span>
      </div>

      {category && (
        <div className="w-min[150px]  items-center hidden md:flex mr-[80px]">
          <div className="rounded-md text-xs bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-black px-2 py-0.5">
            {category}
          </div>
        </div>
      )}

      <div className="min-w-[70px] text-right">{formatedCurrency}</div>

      <div className="ml-4">...</div>
    </div>
  );
};

export default TransactionItem;