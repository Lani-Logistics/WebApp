import { AuthLayout } from "@/Layouts";
import { Circle, CircleCheck, Loader } from "lucide-react";
import { toast } from "sonner";

interface RoleProps {
  handleNextStep: () => void;
  form: FormType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  setSteps: (steps: { step: string }) => void;
}

const Role = ({ handleNextStep, form, handleChange, loading, setSteps }: RoleProps) => {
  const handleNext = () => {
    if (form.role === "") {
      toast.error("Please select a role first!");
      return;
    }
    if(form.role !== "restaurant"){
    handleNextStep();
    }else{
      setSteps({step: "restaurant"})
    }
  };
  return (
    <>
      <AuthLayout
        title="Select a Role 🚀"
        subtitle="Become a rider to deliver food and packages, a customer to order dispatch or meals, or a restaurant to sell food online."
      >
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
              checked={form.role === "customer"}
              className="hidden"
              onChange={handleChange}
            />
            <div
              className={`flex items-center gap-2 bg-background border border-line rounded-xl p-4 ${form.role === "customer" ? "border-primary" : ""}`}
            >
              {form.role === "customer" ? (
                <CircleCheck size={20} className="text-primary" />
              ) : (
                <Circle size={20} className="text-sub" />
              )}
              Customer
            </div>
          </label>
          <label
            htmlFor="rider"
            className="text-main font-sora text-sm font-medium"
          >
            <input
              type="radio"
              name="role"
              id="rider"
              value="rider"
              checked={form.role === "rider"}
              className="hidden"
              onChange={handleChange}
            />
            <div
              className={`flex items-center gap-2 bg-background border border-line rounded-xl p-4 ${form.role === "rider" ? "border-primary" : ""}`}
            >
              {form.role === "rider" ? (
                <CircleCheck size={20} className="text-primary" />
              ) : (
                <Circle size={20} className="text-sub" />
              )}
              Rider
            </div>
          </label>
          <label
            htmlFor="restaurant"
            className="text-main font-sora text-sm font-medium"
          >
            <input
              type="radio"
              name="role"
              id="restaurant"
              value="restaurant"
              checked={form.role === "restaurant"}
              className="hidden"
              onChange={handleChange}
            />
            <div
              className={`flex items-center gap-2 bg-background border border-line rounded-xl p-4 ${form.role === "restaurant" ? "border-primary" : ""}`}
            >
              {form.role === "restaurant" ? (
                <CircleCheck size={20} className="text-primary" />
              ) : (
                <Circle size={20} className="text-sub" />
              )}
              Restaurant
            </div>
          </label>
          <button
            disabled={loading}
            onClick={handleNext}
            className="btn h-10 w-full bg-primary text-white mt-4"
          >
            {loading ? (
              <Loader className="animate-spin" size={18} />
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </AuthLayout>
    </>
  );
};

export default Role;
