import { Routes, Route } from "react-router-dom";
import { Onboarding, SplashSceen } from "@/Screens/Home";
import {
  Role,
  Register,
  Login,
  ResetPassword,
  NewPassword,
  Location,
} from "@/Screens/Auth";
import {
  Dashboard,
  Profile,
  Notifications,
  OrderPreview,
  NotFound,
  Wallet,
} from "@/Screens/Main";
import { CustomerOrders, Dispatch } from "@/Screens/Customer";
import { AvailableOrders, CompletedOrders } from "@/Screens/Rider";
import {
  Overview,
  Users,
  UserDetails,
  OrdersManagement,
} from "@/Screens/Admin";
import { ScrollToTop } from "@/Components/UI";
import { Toaster } from "sonner";
import { ProtectedRoutes } from "./Components/Main";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" richColors className="font-sora" />
      <Routes>
        <Route path="/" element={<SplashSceen />} />
        <Route path="/home" element={<Onboarding />} />
        <Route path="/role" element={<Role />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/location" element={<Location />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<CustomerOrders />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/dispatch" element={<Dispatch />} />
          <Route path="/orders/:id" element={<OrderPreview />} />
          <Route path="/orders/available" element={<AvailableOrders />} />
          <Route path="/orders/completed" element={<CompletedOrders />} />
          <Route path="/wallet" element={<Wallet />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Overview />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/users/:id" element={<UserDetails />} />
          <Route path="/admin/orders" element={<OrdersManagement />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
