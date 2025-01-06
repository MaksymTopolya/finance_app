import React from "react";
import Alert from "./alert";
import { Ban, Check } from "lucide-react";

const AlertMessage = ({ type, message }) => {
  return (
    <>
      {type === "error" && (
        <Alert
          icon={<Ban className="text-red-700 dark:text-red-300 w-6 h-6" />}
          title={<span className="text-red-700 dark:text-red-300">Error</span>}
        >
          <span className="text-red-700 dark:text-red-300">{message}</span>
        </Alert>
      )}
      {type === "success" && (
        <Alert
          icon={
            <Check className="text-green-700 dark:text-green-300 w-6 h-6" />
          }
          title={
            <span className="text-green-700 dark:text-green-300">Success</span>
          }
        >
          <span className="text-green-700 dark:text-green-300">{message}</span>
        </Alert>
      )}
    </>
  );
};

export default AlertMessage;
