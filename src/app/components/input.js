import React from "react";

const Input = (props) => {
  const inputStyles = {
    default:
      "w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950 disabled:opacity-75",
    file: "file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:opacity-50 file:dark:text-gray-400",
    checkbox:
      "rounded shadow-sm border-gray-300 bg-white text-gray-700 dark:text-gray-500 dark:border-gray-700 dark:bg-gray-950 disabled:opacity-75",
  };
  return (
    <input
      {...props}
      className={`${inputStyles[props.type] ?? inputStyles["default"]} ${
        props.className
      }`}
    />
  );
};

export default Input;
