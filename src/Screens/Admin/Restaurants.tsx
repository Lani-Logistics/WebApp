import { Search } from "@/Components/UI";
import { MainLayout } from "@/Layouts";
import { useState } from "react";
import { useAuth } from "@/Hooks";
import { RestaurantCard } from "@/Components/Admin";
const Restaurants = () => {
    const { restaurants } = useAuth();
    const [search, setSearch] = useState("");

    const filteredRestaurants = restaurants.filter((restaurant) => {
        return restaurant.name.toLowerCase().includes(search.toLowerCase());
    });
  return (
    <MainLayout title="Restaurants">
        <div className="space-y-4">
                <Search search={search} setSearch={setSearch} placeholder="Search restaurants by name..." />
            <div className="grid grid-cols-1 gap-4">
                {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.$id} restaurant={restaurant} />
                ))}
            </div>
        </div>
    </MainLayout>
  )
}

export default Restaurants