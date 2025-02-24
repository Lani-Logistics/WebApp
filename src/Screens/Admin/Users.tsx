import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, UserRound } from "lucide-react";
import { Search } from "@/Components/UI";
import { useAuth } from "@/Hooks";
import { MainLayout } from "@/Layouts";
import clsx from "clsx";
const Users = () => {
  const { users } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const navigate = useNavigate();
  useEffect(() => {
    if (!users) return;

    const filtered = users.filter((user) => {
      const matchesSearch = user.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesRole = selectedRole === "all" || user.role === selectedRole;
      return matchesSearch && matchesRole;
    });

    setFilteredUsers(filtered);
  }, [search, selectedRole, users]);


  return (
    <MainLayout title="User Management">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Search
            placeholder="Search users by name..."
            search={search}
            setSearch={setSearch}
          />
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedRole("all")}
              className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
                selectedRole === "all"
                  ? "bg-primary text-white"
                  : "bg-background text-main"
              }`}
            >
              <Filter size={16} />
              All
            </button>
            <button
              onClick={() => setSelectedRole("customer")}
              className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
                selectedRole === "customer"
                  ? "bg-primary text-white"
                  : "bg-background text-main"
              }`}
            >
              Customers
            </button>
            <button
              onClick={() => setSelectedRole("rider")}
              className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
                selectedRole === "rider"
                  ? "bg-primary text-white"
                  : "bg-background text-main"
              }`}
            >
              Riders
            </button>
          </div>
        </div>

        {/* Users List */}
        <div className="grid gap-4 md:grid-cols-2 ">
          {filteredUsers.map((user) => (
            <div
              key={user.$id}
              onClick={() => navigate(`/admin/users/${user.$id}`)}
              className="bg-background border border-line rounded-xl p-4 hover:border-primary cursor-pointer transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-background_2 overflow-hidden">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-main">{user.name}</h3>
                  <p className="text-sm text-sub">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`px-2 py-1 rounded-full capitalize text-xs ${
                        user.role === "rider"
                          ? "bg-orange-500/10 text-orange-500"
                          : "bg-green-500/10 text-green-500"
                      }`}
                    >
                      {user.role}
                    </span>
                    {user.location && (
                      <span className="text-xs text-sub">📍 {user.location}</span>
                    )}
                    {user.role === "rider" && <div className="flex items-center gap-1">
                      &bull;
                      <span className={clsx(
                        user.isVerified ? "text-green-500" : "text-yellow-500",
                        "text-xs"
                      )}>
                        {user.isVerified ? "Verified" : "Unverified"}
                      </span>
                    </div>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background_2 mb-4">
              <UserRound size={32} className="text-sub" />
            </div>
            <h3 className="text-lg font-medium text-main">No users found</h3>
            <p className="text-sub">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Users;
