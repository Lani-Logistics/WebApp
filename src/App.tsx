import { Routes, Route } from "react-router-dom";
import { Onboarding, SplashSceen } from "@/Screens/Home";
import { Role, Register, Login, ResetPassword, NewPassword, Location } from "@/Screens/Auth";
import { Dashboard, Profile, Notifications, OrderPreview, NotFound } from "@/Screens/Main";
import { CustomerOrders, Dispatch } from "@/Screens/Customer";
import { AvailableOrders, CompletedOrders } from "@/Screens/Rider";
import { ScrollToTop } from "@/Components/UI";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
    <ScrollToTop />
    <Toaster position="top-center" richColors className="font-sora" />
      <Routes>
        <Route path="/" element={<SplashSceen />} />
        <Route path="/home" element={<Onboarding/>}/>
        <Route path="/role" element={<Role/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/reset" element={<ResetPassword/>}/>
        <Route path="/new-password" element={<NewPassword/>}/>
        <Route path="/location" element={<Location/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/orders" element={<CustomerOrders/>}/>
        <Route path="/notifications" element={<Notifications/>}/>
        <Route path="/dispatch" element={<Dispatch/>}/>
        <Route path="/orders/:id" element={<OrderPreview/>}/>
        <Route path="/orders/available" element={<AvailableOrders/>}/>
        <Route path="/orders/completed" element={<CompletedOrders/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
