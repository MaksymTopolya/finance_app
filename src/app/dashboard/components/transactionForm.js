"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { categories, types } from "@/utils/const";
import { createTransaction, updateTransaction } from "@/utils/actions";
import { useRouter } from "next/navigation";
import Label from "@/app/components/label";
import Select from "@/app/components/select";
import Input from "@/app/components/input";
import Button from "@/app/components/button";
import ErrorForm from "./errorForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/utils/zod";
const TransactionForm = ({ initialData }) => {
  console.log(initialData);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      created_at: initialData?.created_at
        ? initialData.created_at.split("T")[0] // Відформатована дата
        : new Date().toISOString().split("T")[0], // Поточна дата
    },
    resolver: zodResolver(transactionSchema),
  });

  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState();
  const type = watch("type");
  const editing = Boolean(initialData);

  const router = useRouter();
  const onSubmit = async (data) => {
    console.log(data);
    // return;
    setSending(true);
    setError();

    try {
      if (editing) {
        await updateTransaction(initialData.id, data);
      } else {
        await createTransaction(data);
      }

      router.push("/dashboard");
    } catch (error) {
      setError(error);
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Label htmlFor="type" className="mb-1">
          Type
        </Label>
        <Select
          id="type"
          {...register("type", {
            onChange: (e) => {
              if (e.target.value !== "Expense") {
                setValue("category", undefined);
              }
            },
          })}
        >
          {types.map((type) => (
            <option id={type} key={type}>
              {type}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="category" className="mb-1">
          Category
        </Label>
        <Select
          id="category"
          {...register("category")}
          disabled={type !== "Expense"}
        >
          <option value="">Select a category</option>
          {categories.map((type) => (
            <option id={type} key={type}>
              {type}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="created_at" className="mb-1">
          Date
        </Label>
        <Input id="created_at" {...register("created_at")} disabled={editing} />
        <ErrorForm error={errors.created_at} />
      </div>

      <div>
        <Label htmlFor="amount" className="mb-1">
          Amount
        </Label>
        <Input type="number" id="amount" {...register("amount")} />
        <ErrorForm error={errors.amount} />
      </div>

      <div className="col-span-1 md:col-span-2">
        <Label htmlFor="description" className="mb-1">
          Description
        </Label>
        <Input type="text" id="description" {...register("description")} />
        <ErrorForm error={errors.description} />
      </div>
      {error && <ErrorForm error={error} />}

      <Button
        type="submit"
        variants="ghost"
        sizes="lg"
        className="justify-self-end col-span-2"
        disabled={sending}
      >
        Save
      </Button>
    </form>
  );
};

export default TransactionForm;
