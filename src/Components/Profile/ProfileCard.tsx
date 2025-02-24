import { useAuth } from "@/Hooks";
import { ShieldCheck } from "lucide-react";

const ProfileCard = () => {
  const { userData } = useAuth();
  const username = userData?.name;
  const role = userData?.role;
  const isAdmin = userData?.isAdmin;
  const subrole = userData?.subrole;
  const isBusiness = subrole === "business";
  const isCompany = subrole === "company";
  const businessName = userData?.businessName;
  const businessRegNo = userData?.businessRegNo;
  // const isVerified = userData?.isVerified

  const name = isBusiness ? businessName : username;
  return (
    <div className="bg-background border border-line rounded-xl p-6 relative">
    { subrole && <div className="absolute top-4 right-4 center gap-2 bg-mid px-2 py-1 capitalize rounded-full shadow">
        <div className="p-1 bg-primary rounded-full" />
        <span className="text-main text-xs font-medium">{subrole}</span>
      </div>}
      <div className="flex md:flex-row flex-col gap-4">
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
            {isBusiness && (
              <>
                <p className="text-sub text-sm capitalize">
                  Business Reg No: {businessRegNo}
                </p>
                <p className="text-sub text-sm capitalize">Owner: {username}</p>
              </>
            )}
            {isCompany && (
              <>
                <p className="text-sub text-sm capitalize">Company: {businessName}</p>
                <p className="text-sub text-sm capitalize">
                  Company Reg No: {businessRegNo}
                </p>
              </>
            )}
            <p className="text-sub text-sm capitalize mb-2">Role: {role}</p>
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
  );
};

export default ProfileCard;
