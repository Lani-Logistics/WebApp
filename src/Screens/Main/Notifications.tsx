import { MainLayout } from "@/Layouts";
import { Loader } from "lucide-react";
import { Bell } from "lucide-react";

const Notifications = () => {
  const unreadCount = 0;
  const isLoading = false;
  const markAllAsRead = () => {
    console.log("Mark all as read");
  };
  return (
    <MainLayout title="Notifications">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-background-2">
              <Bell size={20} className="text-main" />
            </div>

            <span className="text-sm text-sub">
              {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
            </span>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-primary font-sora font-medium hover:text-primary/80"
            >
              {isLoading ? (
                <Loader size={16} className="animate-spin" />
              ) : (
                "Mark all as read"
              )}
            </button>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Notifications;
