import { Header } from "@/Components/Main"
import { Navbar } from "@/Components/UI"

const MainLayout = ({title, children}: {title?: string, children: React.ReactNode}) => {
  return (
   <>
      <Header />
      <main className="layout py-6">
        {title && (
          <h1 className="text-xl font-bold font-sora text-main mb-6">{title}</h1>
        )}
        <div className="pb-16 mb-16">{children}</div>
      </main>
      <Navbar />
   </>
  )
}

export default MainLayout