import { AuthContext } from "@/Context";
import { useContext } from "react";

const useAdmin = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAdmin must be used within a AuthProvider");

  return { ...context }
}

export default useAdmin