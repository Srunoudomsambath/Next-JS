'use client';

import React from "react";
import Loading from "@/app/loading";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { useGetProductsQuery } from "@/lib/api/productsApi";
import { addToCart } from "@/lib/slices/cartSlice";
import { useDispatch } from "react-redux";

export default function ProductList() {
  const { data, error, isLoading } = useGetProductsQuery();
  const dispatch = useDispatch();
  if (isLoading) return <Loading />;

  if (error)
    return (
      <div className="text-center text-red-500 h-screen flex justify-center items-center">
        Failed to load products
      </div>
    );

  // Access products array inside data object
  return (
    <section className="w-[90%] mx-auto my-10">
      <h2 className="font-bold text-[24px] text-blue-500 uppercase">Product Page</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {data?.products.map((product) =>
        // data.product cause dummy we must . it one more times 
         (
          <Link key={product.id} href={`/product/${product.id}`} className="no-underline">
            <ProductCard
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              thumbnail={product.thumbnail}
              category={product.category}
            />
           <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded mt-2"
          >
            Add to Cart
          </button>
          </Link>
        ))}
      </div>
    </section>
  );
}
