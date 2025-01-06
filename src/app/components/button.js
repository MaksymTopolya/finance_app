import React from "react";
import { variants, sizes } from "@/utils/variants";
const Button = (props) => {
  return (
    <button
      {...props}
      className={` ${variants ? variants[props.variants] : variants.default} ${
        sizes ? sizes[props.sizes] : sizes.base
      } ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
