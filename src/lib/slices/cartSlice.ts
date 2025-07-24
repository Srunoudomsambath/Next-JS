import { CartItems, ProductType } from "@/types/productType"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type CartState = {
    items: CartItems[]
    total: number
    itemsCount: number
}

const initialState: CartState = {
    items: [],
    total: 0,
    itemsCount: 0,
}
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const product = action.payload
      const existingItem = state.items.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += 1 // quantity = quantity +1
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          images: product.images.length > 0 ? product.images : ["/placeholder.svg"],
          description: product.description,
          category: product.category,
          quantity: 1,
        })
      }
      cartSlice.caseReducers.calculateTotals(state)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      cartSlice.caseReducers.calculateTotals(state)
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload
      const item = state.items.find((item) => item.id === id)

      if (item) {
        item.quantity = Math.max(0, quantity)
        if (item.quantity === 0) {
          state.items = state.items.filter((item) => item.id !== id)
        }
      }
      cartSlice.caseReducers.calculateTotals(state)
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.itemsCount = 0
    },
    calculateTotals: (state) => {
      state.itemsCount = state.items.reduce((total, item) => total + item.quantity, 0)
      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0)
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer