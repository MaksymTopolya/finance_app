"use client";
import React from "react";
import Select from "./select";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Range = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const range = searchParams.get("range") ?? "last30days";
  const onChange = (e) => {
    const params = new URLSearchParams();
    params.set("range", e.target.value);

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Select onChange={onChange} value={range}>
      <option value="today">Today</option>
      <option value="last7days">Last 7 days</option>
      <option value="last30days">Last 30 days</option>
      <option value="last12months">Last 12 months</option>
    </Select>
  );
};

export default Range;
