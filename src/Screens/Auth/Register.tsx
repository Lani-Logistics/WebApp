import { AuthLayout } from "@/Layouts";
import { useLocation } from "react-router-dom";
import { RestaurantRegistration, UserRegistration } from "@/Components/Auth";

const Register = () => {
  const location = useLocation();
  const role  = location.state;
  console.log(role);

  const isRider = role === "rider";
  const isRestaurant = role === "restaurant";


  return (
    <AuthLayout
      title="Create an account 🚀"
      subtitle={`You are registering as ${
        isRider ? "a rider." : isRestaurant ? "a restaurant." : "a customer."
      } Fill in the form below to continue.`}
    >
      {!isRestaurant && <UserRegistration role={role} />}
      {isRestaurant && <RestaurantRegistration />}
    </AuthLayout>
  );
};

export default Register;
