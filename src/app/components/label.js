import React from "react";

const Label = (props) => {
  return (
    <label
      {...props}
      className={`block text-grey-700 dark:text-grey-300 ${props.className}`}
    >
      {props.children}
    </label>
  );
};

export default Label;
