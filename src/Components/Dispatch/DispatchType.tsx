import { useNavigate } from "react-router-dom";
import { Globe, MapPin } from "lucide-react";
import { toast } from "sonner";
import { MainLayout } from "@/Layouts";
import clsx from "clsx";
const DispatchType = () => {
    const navigate = useNavigate();
  

    const handleSameState = () => {
        navigate("/dispatch/same-city");
    };

    const handleInterstate = () => {
        toast.warning("This feature is not available yet.");
    };

    const dispatchTypes = [
        {
            title: "Same State Delivery",
            description: "Deliver within the same state.",
            icon: MapPin,
            isAvailable: true,
            path: "/dispatch/same-city",
        },
        {
            title: "Interstate Delivery",
            description: "Deliver to a different state.",
            icon: Globe,
            isAvailable: false,
            path: "/dispatch/interstate",
        },
    ];

    return (
        <MainLayout title="Dispatch Type">
            <div className="grid grid-cols-1 gap-4">
                {dispatchTypes.map((type) => (
                    <div onClick={type.isAvailable? handleSameState : handleInterstate}  key={type.title} className={clsx("flex flex-col gap-2 p-4 border border-line rounded-lg cursor-pointer space-y-4 transition-colors", type.isAvailable ? "opacity-100" : "opacity-50")}>
                        <div className="center h-10 w-10 rounded-md bg-primary/10"><type.icon size={20}  className="text-primary"/></div>
                        <div>
                            <h2 className="text-lg font-semibold font-sora">{type.title}</h2>
                            <p className="text-sm text-sub">{type.description}</p>
                        </div>
                    </div>
                ))}
            </div>
           
        </MainLayout>
    );
};

export default DispatchType;