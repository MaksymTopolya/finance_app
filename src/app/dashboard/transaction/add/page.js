"use client";
import React from "react";
import Label from "@/app/components/label";
import { categories, types } from "@/utils/const";
import Select from "@/app/components/select";
import Input from "@/app/components/input";
import Button from "@/app/components/button";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/utils/zod";
import { createTransaction } from "@/utils/actions";
import { useRouter } from "next/navigation";
import ErrorForm from "@/app/components/errorForm";

const Page = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState();
  const type = watch("type");

  const router = useRouter();
  const onSubmit = async (data) => {
    console.log(data);
    // return;
    setSending(true);
    setError();

    try {
      await createTransaction(data);

      router.push("/dashboard");
    } catch (error) {
      setError(error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl mb-4 font-semibold">Add Transaction</h1>
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
          <Input id="created_at" {...register("created_at")} />
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
    </div>
  );
};

export default Page;