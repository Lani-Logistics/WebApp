import { useTransactions } from "@/Hooks";
import { ArrowDownRight, Utensils, Package } from "lucide-react";
import { formatDate } from "@/Utils/formatDate";
import { formatNumber } from "@/Utils/formatNumber";
import clsx from "clsx";
const TransactionList = () => {
  const { transactions } = useTransactions();
  return (
    <>
      {transactions.length === 0 && (
        <div className="flex flex-col gap-4 bg-background rounded-lg p-4">
          <p className="text-sub text-sm text-center">No transactions yet!</p>
        </div>
      )}
      {transactions.length > 0 && (
        <div className="flex flex-col gap-4 bg-background rounded-lg p-4">
          {transactions.map((x) => {
          const { category, amount, status, type, description } = x;
          const isCredit = type === "credit";
          const isDeposit = category === "deposit";
          const isPackage = category === "Package";
          const isFood = category === "Food";
          const date = formatDate(x.$createdAt);
          const amountFormatted = isCredit
            ? `+${formatNumber(amount)}`
            : `-${formatNumber(amount)}`;
          const statusColor =
            status === "pending"
              ? "text-yellow-500 bg-yellow-500/10"
              : status === "success"
              ? "text-green-500 bg-green-500/10"
              : "text-red-500 bg-red-500/10";
          return (
            <div
              key={x.$id}
              className="flex items-center gap-2 border-b border-line pb-4 last:border-b-0 last:pb-0"
            >
              <div className="center h-9 w-9 rounded-md text-primary bg-primary/10">
                {isDeposit && <ArrowDownRight size={20} />}
                {isPackage && <Package size={20} />}
                {isFood && <Utensils size={20} />}
              </div>
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm font-sora">{description}</p>
                  <p className="text-xs text-sub">{date}</p>
                </div>
                <div className="text-right">
                  <p
                    className={clsx(
                      isCredit ? "text-green-500" : "text-red-500",
                      "font-medium text-sm font-sora"
                    )}
                  >
                    {amountFormatted}
                  </p>
                  <span
                    className={clsx(
                      statusColor,
                      "text-xs text-center rounded-full px-2 py-1 capitalize"
                    )}
                  >
                    {status}
                  </span>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default TransactionList;
