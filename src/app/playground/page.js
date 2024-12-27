import React from "react";
import Header from "../components/header";
import Trend from "../components/trend";
import TransactionItem from "../components/transactionItem";
import TransactionSummaryItem from "../components/transactionSummaryItem";
import Button from "../components/button";
import Label from "../components/label";
import Input from "../components/input";
import Options from "../components/select";
import Hr from "../components/hr";

export const metadata = {
  title: "Playground",
};

const Page = () => {
  return (
    <main className="space-y-8 mb-50">
      <h1 className="text-4xl mt-8">Playground</h1>

      <div>
        <h2 className="mb-4 text-lg font-mono">ComponentName</h2>
        <Hr />
        <Header />
      </div>

      <div className="flex justify-between">
        <Trend type="Income" amount={4000} prevAmount={8000} />
        <Trend type="Expense" amount={7200} prevAmount={4000} />
        <Trend type="Investment" amount={1000} prevAmount={500} />
        <Trend type="Saving" amount={700} prevAmount={1000} />
      </div>
      <h1 className="mb-4 text-lg font-mono">TransactionItem</h1>
      <div className="space-y-4">
        <TransactionItem type="Income" category="Salary" amount={4000} />
        <TransactionItem type="Expense" category="Food" amount={500} />
        <TransactionItem type="Saving" category="For House" amount={4000} />
        <TransactionItem type="Investment" category="In Apple" amount={9000} />
      </div>
      <Hr />

      <h1 className="mb-4 text-lg font-mono">
        TransactionSummaryItem + TransactionItem
      </h1>
      <div className="space-y-4">
        <TransactionSummaryItem amount={4000} date="2023-01-01" />
        <Hr />
        <TransactionItem type="Income" category="Salary" amount={4000} />
        <TransactionItem type="Expense" category="Food" amount={500} />
        <TransactionItem type="Saving" category="For House" amount={4000} />
        <TransactionItem type="Investment" category="In Apple" amount={9000} />
      </div>

      <h1 className="mb-4 text-lg font-mono">Buttons</h1>
      <div className="space-y-4">
        <Button>Home</Button>
        <Button variants="outline" sizes="xs">
          Home
        </Button>
        <Button variants="ghost" sizes="sm">
          Home
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="mb-1">
            Your name
          </Label>
          <Input type="text" id="name" placeholder="Enter your name" />
        </div>
        <div>
          <Label htmlFor="city" className="mb-1">
            City
          </Label>
          <Options id="city">
            <option value="New York">New York</option>
            <option value="London">London</option>
            <option value="Tokyo">Tokyo</option>
          </Options>
        </div>
        <div className="flex items-center">
          <Input type="checkbox" id="checkbox" />
          <Label htmlFor="acceptTerms" className="ml-2">
            Accept the Terms
          </Label>
        </div>
      </div>
    </main>
  );
};

export default Page;
