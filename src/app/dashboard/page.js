import React, { Suspense } from "react";
import FetchedTrend from "./components/fetchedTrend";
import SuspenseTransactionList from "./components/suspenseTransactionList";
import SuspenseTrends from "./components/suspenseTrends";
import { PlusCircle } from "lucide-react";
import Button from "@/app/components/button";
import Link from "next/link";
import { types } from "@/utils/const";
import { ErrorBoundary } from "react-error-boundary";
import Range from "./components/range";
import TransactionsListWrapper from "./components/transactionsListWrapper";
import { createClient } from "@/utils/supabase/server";

const Page = async ({ searchParams }) => {
  const supabase = createClient();
  const {
    data: {
      user: { user_metadata: settings },
    },
  } = await supabase.auth.getUser();
  const range = searchParams?.range ?? settings?.defaultView ?? "last30days";

  return (
    <section>
      <section className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl mb-4 font-semibold">Summary</h1>
        <aside>
          <Range range={range} />
        </aside>
      </section>

      <section>
        <div className="gap-4 grid grid-cols-2 md:grid-cols-4 mb-4">
          {types.map((type) => (
            <ErrorBoundary
              key={type}
              fallback={
                <div className="text-red-500">
                  Cannot fetch {type} trend data
                </div>
              }
            >
              <Suspense fallback={<SuspenseTrends />}>
                <FetchedTrend type={type} range={range} />
              </Suspense>
            </ErrorBoundary>
          ))}
        </div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Transaction</h1>
          <Link
            className="flex items-center gap-2"
            href="/dashboard/transaction/add"
          >
            <Button
              variants="outline"
              sizes="base"
              className="flex items-center"
            >
              <PlusCircle className="w-4 h-4 mr-1" />
              <p>Add</p>
            </Button>
          </Link>
        </div>
        <Suspense
          fallback={
            <div>
              <SuspenseTransactionList />
            </div>
          }
        >
          <TransactionsListWrapper range={range} />
        </Suspense>
      </section>
    </section>
  );
};

export default Page;
