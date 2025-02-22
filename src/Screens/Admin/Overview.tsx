import { Link } from "react-router-dom";
import { useAuth, usePackageOrder } from "@/Hooks";
import {
  ArrowRight,
  DollarSign,
  Package,
  UserCheck2,
  Utensils,
} from "lucide-react";

import MainLayout from "@/Layouts/MainLayout";
import { Flatrates } from "@/Components/Admin";

const Overview = () => {
  const { parcels } = usePackageOrder();
  const { users, restaurants } = useAuth();
  

  const foodOrders = [];
  const parcelOrders = parcels;
  const completedParcelOrders = parcels.filter(
    (parcel) => parcel.status === "delivered"
  );
  const allCompletedParcelOrdersTotalPrice = completedParcelOrders.reduce(
    (acc, parcel) => acc + parcel.price,
    0
  );
  const allFoodOrdersTotalPrice = 0;
  const totalRevenue =
    allCompletedParcelOrdersTotalPrice + allFoodOrdersTotalPrice;

  const overview = [
    {
      to: "/admin/users",
      icon: <UserCheck2 size={20} />,
      bgColor: "bg-orange-500/10",
      textColor: "text-orange-500",
      title: "Total Users",
      count: users.length,
    },
    {
      to: "/admin/orders",
      icon: <Package size={20} />,
      bgColor: "bg-green-500/10",
      textColor: "text-green-500",
      title: "Total Orders",
      count: parcelOrders.length + foodOrders.length,
    },
    {
      to: "/admin/restaurants",
      icon: <Utensils size={20} />,
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-500",
      title: "Total Restaurants",
      count: restaurants.length,
    }
  ];

  return (
    <>
      <MainLayout>
        <div className="bg-background p-4 rounded-xl">
          <div className="bg-mid p-4 rounded-lg flex md:items-center justify-between md:flex-row flex-col  mb-6 border border-line pb-5">
            <div className="flex md:items-center gap-2 w-full">
              <div className="flex items-center justify-center h-12 min-w-12 w-12 bg-purple-500/10 rounded-full text-purple-500">
                <DollarSign size={24} />
              </div>
              <div className="w-full flex md:items-center md:justify-between md:flex-row flex-col gap-2">
                <div className="flex-1">
                  <h3 className="text-main font-medium">Total Revenue</h3>
                  <p className="text-sub text-sm">All time earnings</p>
                </div>
                <div className=" md:mt-0">
                  <p className="text-main font-sora font-bold text-2xl">
                    &#8358;{totalRevenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-primary gap-3">
                <Package size={20} />
                <span className="text-sub text-sm">Parcel Delivery</span>
              </div>
              <p className="text-main font-sora font-medium">
                &#8358; {allCompletedParcelOrdersTotalPrice.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center justify-between ">
              <div className="flex items-center text-blue-500 gap-3">
                <Utensils size={20} />
                <span className="text-sub text-sm">Food Orders</span>
              </div>
              <p className="text-main font-sora font-medium">
                &#8358; {allFoodOrdersTotalPrice.toLocaleString()}
              </p>
            </div>
          </div>

          <a
            href="paystack.com"
            className="text-white flex items-center gap-2 btn bg-primary border border-line font-sora font-medium mt-4 rounded-md h-10"
          >
            <span>Go to Paystack</span> <ArrowRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {overview.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className="bg-background border border-line hover:border-primary transition-all duration-300 p-4 rounded-xl space-y-4 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`${item.textColor} ${item.bgColor} h-10 w-10 center rounded-lg`}
                >
                  {item.icon}
                </div>
              </div>
              <div>
                <h3 className="text-sub text-sm">{item.title}</h3>
                <div className="text-main text-2xl font-sora font-bold">
                  {item.count}
                </div>
              </div>
            </Link>
          ))}

          
        </div>

        <Flatrates />
      </MainLayout>
    </>
  );
};

export default Overview;
