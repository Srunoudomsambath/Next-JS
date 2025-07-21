'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  addToCart,
  removeFromCart,
  decreaseQuantity,
} from '@/lib/slices/cartSlice';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);

  if (items.length === 0) {
    return (
      <div className="w-[90%] mx-auto my-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p>Add some products and they will appear here.</p>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto my-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Decrease quantity */}
              <button
                onClick={() => dispatch(decreaseQuantity(item.id))}
                className="bg-gray-300 rounded px-3 py-1 font-bold"
                aria-label={`Decrease quantity of ${item.title}`}
              >
                -
              </button>

              {/* Quantity */}
              <span className="w-6 text-center">{item.quantity}</span>

              {/* Increase quantity */}
              <button
                onClick={() => dispatch(addToCart(item))}
                className="bg-gray-300 rounded px-3 py-1 font-bold"
                aria-label={`Increase quantity of ${item.title}`}
              >
                +
              </button>

              {/* Remove */}
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-600 hover:text-red-800 font-semibold"
                aria-label={`Remove ${item.title} from cart`}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-8 text-right text-xl font-bold">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}
