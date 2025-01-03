"use client";
import React from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import useFormatedCurrency from "@/hooks/useFormatedCurrency";

const Trend = ({ type, amount, prevAmount }) => {
  const styles = {
    Income: "text-green-600 dark:text-green-400",
    Expense: "text-red-600 dark:text-red-400",
    Investment: "text-blue-600 dark:text-blue-400",
    Saving: "text-yellow-600 dark:text-yellow-400",
  };

  const calculatePercentage = () => {
    if (prevAmount === 0 || amount === 0 || !prevAmount) return 0;
    return ((amount - prevAmount) / prevAmount) * 100;
  };

  const formatedCurency = useFormatedCurrency(amount);

  return (
    <div>
      <div className={`font-semibold ${styles[type]}`}>{type}</div>
      <div className="text-2xl font-semibold text-black dark:text-white mb-2">
        {amount ? formatedCurency : useFormatedCurrency(0)}
      </div>
      {prevAmount ? (
        <div className="flex space-x-1 items-center text-sm">
          <div>
            {calculatePercentage() > 0 && (
              <ArrowUpRight className="text-green-600 dark:text-green-400" />
            )}
            {calculatePercentage() <= 0 && (
              <ArrowDownLeft className="text-red-600 dark:text-red-400" />
            )}
          </div>
          <div>
            {prevAmount && `${calculatePercentage().toFixed(0)}%`} vs last
            period
          </div>
        </div>
      ) : (
        <div>no info</div>
      )}
    </div>
  );
};

export default Trend;
