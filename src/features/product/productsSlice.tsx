import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface initialStateProps {
  id: string | null;
  name: string | null;
  description: string | null;
  price: number | null;
}
const initialState: initialStateProps[] = [];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (_state, action) => {
      return action.payload;
    },
    clearProducts: () => {
      return [];
    },
  },
});

export const { setProducts, clearProducts } = productsSlice.actions;
export default productsSlice.reducer;
export const selectProducts = (state: RootState) => state.products;
