import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Loader className="animate-spin text-primary" size={24} />
        <p className="text-main text-sm">Preparing dashboard...</p>
      </div>
    </div>
  );
};

export default Loading