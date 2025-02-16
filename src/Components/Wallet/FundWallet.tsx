import { useState } from "react";
import { Input } from "../UI";
import { Loader, Wallet } from "lucide-react";
import PaystackPop from "@paystack/inline-js";
import { toast } from "sonner";
import { useTransactions } from "@/Hooks";

const FundWallet = () => {
  const { createTransaction } = useTransactions();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFundWallet = () => {
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: "giftjacksun@gmail.com",
      amount: Number(amount) * 100,
      currency: "NGN",
      onSuccess: (transaction) => {
        console.log(transaction);
        createTransaction(
          Number(amount),
          "success",
          "credit",
          "deposit",
          "Funding wallet"
        );
        toast.success("Funding successful");
      },
      onCancel: () => {
        console.log("Transaction cancelled");
      },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amount) {
      setError("Amount is required");
      return;
    }
    if (Number(amount) < 500) {
      setError("Amount must be equal or greater than 500 NGN");
      toast.error("Amount must be equal or greater than 500 NGN");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      handleFundWallet();
      setIsLoading(false);
      setAmount("");
      setError("");
    }, 1000);
  };

  return (
    <div className="bg-background rounded-lg">
      <div className="flex flex-col justify-between">
        <p className="text-sm p-4 font-sora border-b border-line pb-2 font-medium">
          Fund Wallet
        </p>
        <form onSubmit={handleSubmit} className="space-y-2 mt-4 px-4 pb-4">
          <Input
            type="number"
            placeholder="Amount"
            styles="bg-secondary"
            icon={<Wallet size={18} />}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={error}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="btn bg-primary text-white h-9 w-full"
          >
            {isLoading ? <Loader className="animate-spin" /> : "Fund"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FundWallet;
