import { NotificationContext } from "@/Context/NotificationContext";
import { useContext } from "react";

const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within NotificationProvider!"
    );
  }

  return { ...context };
};

export default useNotification;
