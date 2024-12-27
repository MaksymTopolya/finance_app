import React from "react";

const Input = (props) => {
  const inputStyles = {
    default:
      "w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950",
    checkbox:
      "rounded shadow-sm border-gray-300 bg-white text-gray-700 dark:text-gray-500 dark:border-gray-700 dark:bg-gray-950",
  };
  return (
    <input
      {...props}
      className={`${inputStyles[props.type] ?? inputStyles.default}`}
    />
  );
};

export default Input;
