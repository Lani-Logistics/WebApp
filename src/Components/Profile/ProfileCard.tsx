import { useAuth } from "@/Hooks";
import { ShieldCheck } from "lucide-react";

const ProfileCard = () => {

    const {userData} = useAuth();
    const name = userData?.name;
    const role = userData?.role;
    const isAdmin = userData?.isAdmin;
  return (
    <div className="bg-background border border-line rounded-xl p-6">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full bg-background_2 overflow-hidden">
                <img
                  src={`https://ui-avatars.com/api/?name=${name}&background=random`}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="">
                  <h2 className="text-xl font-semibold text-main">{name}</h2>
                  <p className="text-sub text-sm capitalize mb-2">{role}</p>
                  {isAdmin && (
                    <span className="px-2 py-1 pr-4 bg-orange-500/10 text-primary text-sm font-medium rounded-full inline-flex items-center gap-1">
                      <ShieldCheck size={16} />
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
  )
}

export default ProfileCard