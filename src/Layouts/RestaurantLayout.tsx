import { Header } from "@/Components/Restaurant"


const RestaurantLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <>
    <Header/>
    <main className="layout">
        {children}
    </main>
    </>
  )
}

export default RestaurantLayout