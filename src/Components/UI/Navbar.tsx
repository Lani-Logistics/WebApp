import {  LayoutDashboard, Package, Wallet, UserRound, BellPlus, DollarSign } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/Hooks";
const Navbar = () => {
  const location = useLocation();
  const { userData } = useAuth();

  const isAdminRoute = location.pathname.includes("/admin");
  const isRider = userData?.role === "rider";


  const userLinks = [
    {
      name: "Home",
      icon: LayoutDashboard,
      to: "/dashboard",
    },
   
    {
      name: "Orders",
      icon: Package,
      to: isRider ? "/orders/available" : "/orders",
    },
    {
      name: "Wallet",
      icon: Wallet,
      to: "/wallet",
    },
  
    {
      name: "Profile",
      icon: UserRound,
      to: "/profile",
    },
  ];

  const adminLinks = [
    {
      name: "Home",
      icon: LayoutDashboard,
      to: "/admin",
    },
 
    {
      name: "Flat Rates",
      icon: DollarSign,
      to: "/admin/settings/flat-rates",
    },
    {
      name: "Notifications",
      icon: BellPlus,
      to: "/admin/settings/notifications",
    },
    {
      name: "Profile",
      icon: UserRound,
      to: "/profile",
    },
  ];

  const links = isAdminRoute ? adminLinks : userLinks;

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-6 px-4">
      <nav className="bg-background/70 backdrop-blur-lg border border-line rounded-2xl px-4 py-3 shadow-lg shadow-black/5">
        <ul className="flex items-center gap-3">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink 
                to={link.to}
                className={`
                  p-3 rounded-xl flex items-center justify-center
                  transition-all duration-300 relative
                  ${location.pathname === link.to 
                    ? "text-primary scale-110" 
                    : "text-sub hover:text-main hover:bg-background-2"
                  }
                  ${location.pathname === link.to 
                    ? "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-primary" 
                    : ""
                  }
                `}
              >
                <link.icon 
                  size={20} 
                  className={`transition-transform ${
                    location.pathname === link.to 
                      ? "transform rotate-[360deg] duration-500" 
                      : ""
                  }`}
                />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
