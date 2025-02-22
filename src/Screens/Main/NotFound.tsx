import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center flex-col h-screen">
            <img src="/logo-orange.png" alt="logo" width={80} />
            <h1 className="text-4xl font-sora font-bold">404 - Not Found</h1>
            <p className="mt-4">The page you are looking for does not exist.</p>
            <button onClick={() => navigate(-1)} className="mt-4 bg-primary h-10 btn text-white w-[200px]">
                <ArrowLeft size={20} />
                Go Back
                </button>
        </div>
    );
};

export default NotFound; 