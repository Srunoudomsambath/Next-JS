
type CartItem = ProductList & {
  quantity: number;
};

type CartState = {
  items: CartItem[];
  total: number;
  itemCount: number;
};
import { ProductList } from "@/types/productType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductList>) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.itemCount += 1;
      state.total += product.price;
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (!existingItem) return;

      state.itemCount -= existingItem.quantity;
      state.total -= existingItem.price * existingItem.quantity;

      state.items = state.items.filter((item) => item.id !== id);
    },
          // Add this reducer if you don't have it yet
      decreaseQuantity: (state, action: PayloadAction<number>) => {
        const id = action.payload;
        const item = state.items.find((item) => item.id === id);
        if (!item) return;

        item.quantity -= 1;
        state.itemCount -= 1;
        state.total -= item.price;

        if (item.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        }
      },

  },
});


export const { addToCart, removeFromCart,decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
