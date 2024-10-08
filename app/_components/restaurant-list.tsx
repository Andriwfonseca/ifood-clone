import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";

const RestaurantList = async () => {
  const session = await getServerSession(authOptions);

  //TODO: pegar restaurantes com maior numero de pedidos
  const restaurants = await db.restaurant.findMany({ take: 10 });

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  return (
    <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
          userFavoriteRestaurants={userFavoriteRestaurants}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
