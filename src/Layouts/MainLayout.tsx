import { Header } from "@/Components/Main"
import { Navbar } from "@/Components/UI"
import { useAuth } from "@/Hooks";
const MainLayout = ({title, children}: {title?: string, children: React.ReactNode}) => {
  const { userData } = useAuth();
  const isRider = userData?.role === "rider";
  const isVerified = userData?.isVerified === true;
  return (
   <>
      <Header />
      <main className="layout py-6">
        {title && (
          <h1 className="text-xl font-bold font-sora text-main mb-6">{title}</h1>
        )}
        <div className="pb-16 mb-16">{children}</div>
      </main>
      {isRider && isVerified && <Navbar />}
   </>
  )
}

export default MainLayout