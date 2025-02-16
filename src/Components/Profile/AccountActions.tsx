import { useAuth } from "@/Hooks";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { LogOut, Loader } from "lucide-react";
const AccountActions = () => {
  const { userData, loading, logout } = useAuth();
  const isAdmin = userData?.isAdmin;
  
  const handleLogout = () => {
    toast.promise(logout(), {
      loading: "Logging out...",
      success: () => "Logged out successfully",
      error: (error) => (error as Error).message,
    });
  };

  return (
    
    <>
    <div className="bg-background border border-line rounded-xl overflow-hidden">
            <div className="p-4 border-b border-line">
              <h3 className="font-semibold text-main">Account Actions</h3>
            </div>
            <div className="p-4">
              {isAdmin && (
                <>
                <Link
                  to="/admin"
                  className="bg-primary/10 text-primary h-10 center gap-2 text-sm font-sora font-medium rounded-lg mb-2"
                >
                  Admin Dashboard
                </Link>
                <Link
                  to="/dashboard"
                  className="bg-mid border border-line text-sub h-10 center gap-2 text-sm font-sora font-medium rounded-lg mb-2"
                >
                  My Dashboard
                </Link>
                </>
              )}
              <button disabled={loading} onClick={handleLogout} className="w-full center gap-2 h-10 text-sm font-sora font-medium bg-red-500 text-white rounded-lg hover:bg-red-500/90 transition-colors">
                {loading ? <Loader className="animate-spin" size={18} /> : <LogOut size={18} />}
                {loading ? "Logging out..." : "Log Out"}
              </button>
            </div>
          </div>
    </>
  )
}

export default AccountActions