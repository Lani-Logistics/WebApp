import { AuthLayout } from "@/Layouts";
import { Search } from "@/Components/UI";
import { useState } from "react";
import { states } from "@/Constants/data";
import { CheckCircle, Circle, Loader, MapPinned } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/Hooks";

const Location = () => {
  const { register, registerRestaurant, loading } = useAuth();
  const location = useLocation();

  const userRegData = location.state?.userRegData as RegisterFormTypes | undefined;
  const restaurantRegData = location.state?.restaurantRegData as RestaurantRegistrationFormTypes | undefined;

  console.log("userRegData", userRegData);
  console.log("restaurantRegData", restaurantRegData);

  const [search, setSearch] = useState("");
  const [userForm, setUserForm] = useState<RegisterFormTypes>({
    name: userRegData?.name || "",
    email: userRegData?.email || "",
    phone: userRegData?.phone || "",
    password: userRegData?.password || "",
    role: userRegData?.role || "",
    city: "",
  });

  const [restaurantForm, setRestaurantForm] = useState<RestaurantRegistrationFormTypes>({
    restaurantName: restaurantRegData?.restaurantName || "",
    email: restaurantRegData?.email || "",
    phone: restaurantRegData?.phone || "",
    password: restaurantRegData?.password || "",
    role: restaurantRegData?.role || "",
    address: restaurantRegData?.address || "",
    lat: restaurantRegData?.lat || 0,
    lon: restaurantRegData?.lon || 0,
    city: "",
  });

  const filteredStates = states.filter((state) =>
    state.capital.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userRegData && !userForm.city) {
      toast.error("Please select a city");
      return;
    }

    if (restaurantRegData && !restaurantForm.city) {
      toast.error("Please select a city");
      return;
    }

    if (userRegData && userForm) {
      register(userForm);
      return;
    }

    if (restaurantRegData && restaurantForm) {
        registerRestaurant(restaurantForm);
        return;
    }
  };

  return (
    <AuthLayout
      title="Select Your Location 📍"
      subtitle="Choose the city where you'll be making deliveries."
    >
      <Search search={search} setSearch={setSearch} placeholder="Search for a city" />

      {filteredStates.length === 0 && (
        <div className="flex flex-col gap-2 center mt-4">
          <p className="text-sm text-sub">No results found!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        {filteredStates.map((state) => (
          <label key={state.id}>
            <input
              type="radio"
              name="city"
              value={state.capital}
              checked={
                userRegData ? userForm.city === state.capital : restaurantForm.city === state.capital
              }
              onChange={() => {
                if (userRegData) {
                  setUserForm({ ...userForm, city: state.capital });
                } else if (restaurantRegData) {
                  setRestaurantForm({ ...restaurantForm, city: state.capital });
                }
              }}
              className="hidden"
            />
            <div
              className={`flex items-center gap-4 bg-background rounded-xl p-2 ${
                (userRegData && userForm.city === state.capital) ||
                (restaurantRegData && restaurantForm.city === state.capital)
                  ? "border border-primary"
                  : "border border-line"
              }`}
            >
              <div
                className={`rounded-md h-10 w-10 center ${
                  (userRegData && userForm.city === state.capital) ||
                  (restaurantRegData && restaurantForm.city === state.capital)
                    ? "bg-primary/10 text-primary"
                    : "bg-background-2 text-sub"
                }`}
              >
                <MapPinned size={20} />
              </div>
              <div className="flex-1">
                <span className="text-sm font-sora font-medium">{state.capital}</span>
                <p className="text-xs text-sub">{state.state}</p>
              </div>

              <div className="center h-10 w-10">
                {(userRegData && userForm.city === state.capital) ||
                (restaurantRegData && restaurantForm.city === state.capital) ? (
                  <CheckCircle size={20} className="text-primary" />
                ) : (
                  <Circle size={20} className="text-sub" />
                )}
              </div>
            </div>
          </label>
        ))}
        <button type="submit" className="btn h-10 bg-primary text-white center rounded-xl" disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : "Done"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Location;
