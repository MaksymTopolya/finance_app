import React, { useMemo } from "react";

const useFormatedCurrency = (amount) => {
  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return formatCurrency(amount);
};

export default useFormatedCurrency;
