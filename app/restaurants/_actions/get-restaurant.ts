"use server";

import { db } from "@/app/_lib/prisma";

export const getRestaurant = async (id: string) => {
  const restaurantData = await db.restaurant.findUnique({
    where: { id },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return restaurantData;
};
