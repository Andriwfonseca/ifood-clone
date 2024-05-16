import { Product } from "@prisma/client";

export const calculateProductTotalPrice = (product: Product): number => {
  const price = Number(product.price);

  if (product.discountPercentage > 0) {
    const discount = price * (product.discountPercentage / 100);
    return price - discount;
  }

  return price;
};

export const formatCurrency = (value: number) => {
  return `R$${Intl.NumberFormat("PT-BR", {
    minimumFractionDigits: 2,
    currency: "BRL",
  }).format(value)}`;
};
