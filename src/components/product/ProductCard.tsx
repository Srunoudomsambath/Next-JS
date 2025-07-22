'use client';

import { ProductList } from '@/types/productType';
import Image from 'next/image';
import React from 'react';
import { addToCart } from "@/lib/slices/cartSlice";
import { useDispatch } from "react-redux";
import Link from 'next/link';

export default function ProductCard({
  id,
  title,
  description,
  price,
  thumbnail,
  category,
}: ProductList) {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent event bubbling
    dispatch(
      addToCart({
        id,
        title,
        description,
        price,
        thumbnail,
        category,
      })
    );
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm hover:shadow-xl transition duration-200">
      {/* Only image links to the product detail */}
      <Link href={`/product/${id}`} className="block">
        <div className="relative">
          <Image
            width={300}
            height={300}
            className="w-full"
            src={thumbnail}
            alt={title}
            unoptimized
          />
          <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
            SALE
          </div>
        </div>
      </Link>

      <div className="p-4">
        <h3 className="text-lg font-medium mb-2 line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <p className="text-gray-500 text-xs mb-2">Category: {category}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">${price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded mt-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
