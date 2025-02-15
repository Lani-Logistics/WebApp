import { MainLayout } from "@/Layouts";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth, usePackageOrder } from "@/Hooks";
import { useState, useEffect } from "react";
import { Models } from "appwrite";
import { Mail, Phone, MapPin, Calendar, Package, Bike } from "lucide-react";
const UserDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { users } = useAuth();
    const { parcels } = usePackageOrder();
    const [user, setUser] = useState<Models.Document | null>(null);
    const [userOrders, setUserOrders] = useState<Models.Document[]>([]);
  
    useEffect(() => {
      if (!users || !id) return;
      const foundUser = users.find(u => u.$id === id);
      if (foundUser) {
        setUser(foundUser);
        // Filter orders based on user role
        const orders = foundUser.role === 'rider' 
          ? parcels.filter(order => order.riderId === id)
          : parcels.filter(order => order.customerId === id);
        setUserOrders(orders);
      }
    }, [users, id, parcels]);
  
    console.log(userOrders);
  
    if (!user) {
      return (
        <MainLayout>
          <div className="text-center py-12">
            <h2 className="text-xl font-bold text-main">User not found</h2>
            <button
              onClick={() => navigate('/admin/users')}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
            >
              Back to Users
            </button>
          </div>
        </MainLayout>
      );
    }


  return (
    <MainLayout title="User Details">
      <div className="space-y-4">
 {/* User Profile Card */}
 <div className="bg-background border border-line rounded-xl p-6">
          <div className="flex items-start md:flex-row flex-col gap-6">
            <div className="min-w-24 w-24 h-24 rounded-full bg-background-2 overflow-hidden">
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=random&size=96`}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold font-sora text-main">{user.name}</h2>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center text-sm gap-2 text-sub">
                  <Mail size={18} />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center text-sm gap-2 text-sub">
                  <Phone size={18} />
                  <span>{user.phone}</span>
                </div>
                {user.city && (
                  <div className="flex items-center text-sm gap-2 text-sub">
                    <MapPin size={18} />
                    <span>{user.city}</span>
                  </div>
                )}
                <div className="flex items-center text-sm gap-2 text-sub">
                  <Calendar size={18} />
                  <span>Joined {new Date(user.$createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="mt-4">
                <span className={`px-3 py-1 rounded-full capitalize text-sm ${
                  user.role === 'rider' 
                    ? 'bg-orange-500/10 text-orange-500' 
                    : 'bg-green-500/10 text-green-500'
                }`}>
                  {user.role}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-background border border-line rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Package size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sub text-sm">Total Orders</p>
                <p className="text-xl font-bold text-main">{userOrders.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-background border border-line rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Package size={20} className="text-green-500" />
              </div>
              <div>
                <p className="text-sub text-sm">Completed</p>
                <p className="text-xl font-bold text-main">
                  {userOrders.filter(order => order.status === 'delivered').length}
                </p>
              </div>
            </div>
          </div>

          {user.role === 'rider' && (
            <>
              <div className="bg-background border border-line rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Bike size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sub text-sm">In Transit</p>
                    <p className="text-xl font-bold text-main">
                      {userOrders.filter(order => order.status === 'in-transit').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-background border border-line rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/10">
                    <Package size={20} className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sub text-sm">Pending</p>
                    <p className="text-xl font-bold text-main">
                      {userOrders.filter(order => order.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-background border border-line rounded-xl overflow-hidden">
          <div className="p-4 border-b border-line">
            <h3 className="font-semibold text-main">Recent Orders</h3>
          </div>
          <div className="divide-y divide-line">
            {userOrders.length === 0 ? (
              <div className="p-4 text-center text-sub">
                No orders found
              </div>
            ) : (
              userOrders.slice(0, 5).map((order) => (
                <div 
                  key={order.$id}
                  className="p-4 hover:bg-background_2 cursor-pointer"
                  onClick={() => navigate(`/admin/orders/${order.trackingId}`)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-main">{order.packageName}</p>
                      <p className="text-sm text-sub">ID: {order.trackingId}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      order.status === 'delivered' 
                        ? 'bg-green-500/10 text-green-500'
                        : order.status === 'in-transit'
                        ? 'bg-blue-500/10 text-blue-500'
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserDetails