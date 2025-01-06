"use client";
import React from "react";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import SelectDataRange from "./selectDataRange";

const Range = ({ range: defaultRange }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const range = searchParams.get("range") ?? defaultRange ?? "last30days";
  const onChange = (e) => {
    const params = new URLSearchParams();
    params.set("range", e.target.value);

    replace(`${pathname}?${params.toString()}`);
  };
  return <SelectDataRange onChange={onChange} value={range} />;
};

export default Range;
