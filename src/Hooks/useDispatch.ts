import { DispatchFormContext } from "@/Context/DispatchFormContext";
import { useContext } from "react";

const useDispatch = () => {
  const context = useContext(DispatchFormContext);

  if (!context) {
    throw new Error("useDispatch must be used within a DispatchFormProvider");
  }

 

  return {
    ...context
  };
};

export default useDispatch;
