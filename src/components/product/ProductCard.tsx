import { addToCart } from '@/lib/slices/cartSlice'
import { useAppDispatch } from '@/lib/hooks'
import { ProductType } from '@/types/productType'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


type ProductCardProps = {
  product: ProductType
}

export default function ProductCard({ product }: ProductCardProps) {
    const dispatch = useAppDispatch()

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        console.log(`Adding product ${product.id} to cart`)
        dispatch(addToCart(product))
    }

    return (
        <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm">
            <Link href={`/product/${product.id}`} className='no-underline'>
                <div className="relative">
                    <Image
                        width={300}
                        height={300}
                        className="w-full"
                        src={product.images[0]}
                        alt={product.title}
                        unoptimized
                        priority
                    />
                    <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">SALE
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-medium mb-2 line-clamp-1">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <p className="text-gray-500 text-xs mb-2">Category: {product.category?.name}</p>
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">${product.price}</span>
                    </div>
                </div>
            </Link>
            <button onClick={handleAddToCart} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-b-lg w-full transition duration-200 ease-in-out">
                Add to Cart
            </button>
        </div>
    )
}
