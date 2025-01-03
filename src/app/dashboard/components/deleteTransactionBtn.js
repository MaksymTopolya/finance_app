import React from "react";
import Button from "@/app/components/button";
import { deleteTransaction } from "@/utils/actions";
import { X, Loader } from "lucide-react";

const DeleteTransactionBtn = ({ id, onRemoved }) => {
  const [loading, setLoading] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const handleClick = async () => {
    if (!confirm) return setConfirm(true);

    try {
      setLoading(true);
      await deleteTransaction(id);
      onRemoved();
    } finally {
      setLoading(false);
      setConfirm(false);
    }
  };
  return (
    <Button
      variants={!confirm ? "ghost" : "danger"}
      sizes="xs"
      onClick={handleClick}
      aria-disabled={loading}
    >
      {!loading && <X className="w-4 h-4" />}
      {loading && <Loader className="w-4 h-4 animate-spin" />}
    </Button>
  );
};

export default DeleteTransactionBtn;
