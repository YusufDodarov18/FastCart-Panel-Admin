import { configureStore } from "@reduxjs/toolkit";
import category from "../reducers/Category/category"; 
import brands from "../reducers/Brands/brands"
import product from "../reducers/Products/products"
import order from "../reducers/Orders/order"

export const store = configureStore({
  reducer: {
    category: category,
    brands:brands,
    product:product,
    orders:order
  },
});
