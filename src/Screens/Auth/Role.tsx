import { AuthLayout } from "@/Layouts";
import { Circle, CircleCheck, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Role = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const handleRole = (role: string) => {
    setRole(role);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (role === "") {
      toast.error("Please select a role first!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      navigate("/register", { state: role });
      setLoading(false);
    }, 1000);
  };
  return (
    <>
      <AuthLayout
        title="Please Select a Role 🚀"
        subtitle="Become a rider and deliver food and packages to our customers or become a customer and order a dispatch or food from your favorite restaurant"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <label
              htmlFor="customer"
              className="text-main font-sora text-sm font-medium "
            >
              <input
                type="radio"
                name="role"
                id="customer"
                value="customer"
                checked={role === "customer"}
                className="hidden"
                onChange={(e) => handleRole(e.target.value)}
              />
              <div className={`flex items-center gap-2 bg-background border border-line rounded-xl p-4 ${role === "customer" ? "border-primary" : ""}`}>
                {role === "customer" ? (
                  <CircleCheck size={20} className="text-primary" />
                ) : (
                  <Circle size={20} className="text-sub"  />
                )}
                Customer
              </div>
            </label>
            <label htmlFor="rider" className="text-main font-sora text-sm font-medium">
              <input
                type="radio"
                name="role"
                id="rider"
                value="rider"
                checked={role === "rider"}
                className="hidden"
                onChange={(e) => handleRole(e.target.value)}
              />
              <div className={`flex items-center gap-2 bg-background border border-line rounded-xl p-4 ${role === "rider" ? "border-primary" : ""}`}>
                {role === "rider" ? (
                  <CircleCheck size={20} className="text-primary" />
                ) : (
                  <Circle size={20} className="text-sub"  />
                )}
                Rider
              </div>
            </label>
            <label htmlFor="restaurant" className="text-main font-sora text-sm font-medium">
              <input
                type="radio"
                name="role"
                id="restaurant"
                value="restaurant"
                checked={role === "restaurant"}
                className="hidden"
                onChange={(e) => handleRole(e.target.value)}
              />
              <div className={`flex items-center gap-2 bg-background border border-line rounded-xl p-4 ${role === "restaurant" ? "border-primary" : ""}`}>
                {role === "restaurant" ? (
                  <CircleCheck size={20} className="text-primary" />
                ) : (
                  <Circle size={20} className="text-sub"  />
                )}
                Restaurant
              </div>
            </label>
          </div>
          <button disabled={loading} className="btn h-10 w-full bg-primary text-white mt-4">
            {loading ? <Loader className="animate-spin" size={18} /> : "Continue"}
          </button>
        </form>
      </AuthLayout>
    </>
  );
};

export default Role;
