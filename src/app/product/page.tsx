'use client';

import React from "react";
import Loading from "@/app/loading";
import ProductCard from "@/components/product/ProductCard";
import { useGetProductsQuery } from "@/lib/api/productsApi";

export default function ProductList() {
  const { data, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <Loading />;

  if (error)
    return (
      <div className="text-center text-red-500 h-screen flex justify-center items-center">
        Failed to load products
      </div>
    );

  return (
    <section className="w-[90%] mx-auto my-10">
      <h2 className="font-bold text-[24px] text-blue-500 uppercase">Product Page</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {data?.products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            thumbnail={product.thumbnail}
            category={product.category}
          />
        ))}
      </div>
    </section>
  );
}
