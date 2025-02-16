import { AuthLayout } from "@/Layouts";
import { Search } from "@/Components/UI";
import { useState } from "react";
import { states } from "@/Constants/data";
import { CheckCircle, Circle, Loader, MapPinned } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { useAuth, useNotifications } from "@/Hooks";

const Location = () => {
  const { register, loading, user } = useAuth();
  const {createNotifications} = useNotifications()
  const location = useLocation();
  const {form: data} = location.state as {form: RegisterFormTypes};
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<RegisterFormTypes>({
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.password,
    role: data.role,
    city: "",
  });
  const filteredStates = states.filter((state) => state.capital.toLowerCase().includes(search.toLowerCase()));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!form.city){
      toast.error("Please select a city");
      return;
    }
    register(form);
    if(user?.$id){
    createNotifications(
      {title: "Welcome to Lani Logistics",
        type: "system",
        content: "Thank you for registering with us",
        path: "dashboard",
        isRead: false,
      },
      user?.$id
    );
    }
  }
  return (
    <>
      <AuthLayout
        title="Select Your Location 📍"
        subtitle="Choose the city where you'll be making deliveries."
      >
        <Search
          search={search}
          setSearch={setSearch}
          placeholder="Search for a city"
        />

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
                checked={form.city === state.capital}
                onChange={() => setForm({...form, city: state.capital})}
                className="hidden"
              />
              <div
                className={`flex items-center gap-4 bg-background rounded-xl p-2 ${
                  form.city === state.capital
                    ? "border border-primary"
                    : "border border-line"
                }`}
              >
                <div
                  className={`rounded-md h-10 w-10 center ${
                    form.city === state.capital
                      ? "bg-primary/10 text-primary"
                      : "bg-background-2 text-sub"
                  }`}
                >
                  <MapPinned size={20} />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-sora font-medium">
                    {state.capital}
                  </span>
                  <p className="text-xs text-sub">{state.state}</p>
                </div>

                <div className="center h-10 w-10">
                    {form.city === state.capital ? <CheckCircle size={20} className="text-primary" /> : <Circle size={20} className="text-sub" />}
                </div>
              </div>
            </label>
          ))}
          <button type="submit" className="btn h-10 bg-primary text-white center rounded-xl" disabled={loading}>
            {loading ? <Loader className="animate-spin" /> : "Done"}
          </button>
        </form>
      </AuthLayout>
    </>
  );
};

export default Location;
