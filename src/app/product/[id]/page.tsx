'use client';
import Loading from '@/app/loading';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react'
import { useGetProductByIdQuery } from '@/lib/api/productsApi';

// async function getProduct({params}: {params: {id: string}}): Promise<ProductType | null> {
//     const paramsId = params;
//     const res = fetch(`${process.env.BASE_URL_API}products/${paramsId.id}`);
//     const data = (await res).json();
//     const product: ProductType = await data;
//     return product;
// }

export default function ProductDetail() {
  const { id } = useParams();
  const productId = Number(id);

  const { data: productDetail, isLoading, error } = useGetProductByIdQuery(productId, {
    skip: isNaN(productId),
  });

  if (isLoading) return <Loading />;

  if (error || !productDetail) return (
    <div className="text-center text-red-500 h-screen flex justify-center items-center">
      Failed to load product
    </div>
  );

  return (
    <div className="w-[90%] mx-auto my-10">
      <div className="flex bg-white rounded-lg shadow dark:bg-gray-800 flex-col md:flex-row">
        <div className="relative w-full md:w-[50%] flex justify-center items-center">
          <Image
            src={productDetail.thumbnail}
            alt={productDetail.title}
            width={300}
            height={300}
            unoptimized
            className="object-cover w-full h-48 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <h1 className="flex-auto text-xl font-semibold dark:text-gray-50">{productDetail.title}</h1>
            <div className="text-xl font-semibold text-gray-500 dark:text-gray-300">${productDetail.price}</div>
            <div className="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">In stock</div>
          </div>
          {/* ... rest of your JSX */}
          <p className="text-sm text-gray-500 dark:text-gray-300">{productDetail.description}</p>
          <p className="text-lg dark:text-gray-300 bg-blue-300 p-2 rounded-lg mt-5 text-white">
            Category : {productDetail.category}
          </p>
        </form>
      </div>
    </div>
  );
}

