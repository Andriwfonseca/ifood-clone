"use client";

import { Restaurant } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "../_actions/search";
import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";

const Restaurants = () => {
  const searchParams = useSearchParams();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const searchFor = searchParams.get("search");
      if (!searchFor) return;

      setLoading(true);

      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);

      setLoading(false);
    };

    fetchRestaurants();
  }, [searchParams]);

  return (
    <>
      <Header />

      <div className="p-6 px-5">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Encontrados</h2>

        {!loading && (
          <div className="flex w-full flex-col gap-6">
            {restaurants.length > 0 &&
              restaurants.map((restaurant) => (
                <RestaurantItem
                  key={restaurant.id}
                  restaurant={restaurant}
                  className="min-w-full max-w-full"
                />
              ))}
            {restaurants.length === 0 && (
              <span>Nenhum restaurante encontrado.</span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Restaurants;
