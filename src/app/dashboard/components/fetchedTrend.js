import React from "react";
import Trend from "./trend";
import { createClient } from "@/utils/supabase/server";
const FetchedTrend = async ({ type, range }) => {
  // await delay(5000);
  const supabase = createClient();
  let { data, error } = await supabase.rpc("calculate_total", {
    range_arg: range,
    type_arg: type,
  });
  if (error) throw new Error("Could not fetch data");

  const amount = data[0];

  return (
    <Trend
      type={type}
      amount={amount.current_amount}
      prevAmount={amount.previous_amount}
    />
  );
};

export default FetchedTrend;
