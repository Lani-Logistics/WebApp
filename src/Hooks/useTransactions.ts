import { useContext } from "react";
import { AuthContext } from "@/Context";
const useTransactions = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useTransactions must be used within an AuthProvider");
  return { ...context };
};

export default useTransactions;
