import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface initialStateProps {
  id: null;
  name: string | null;
  description: string | null;
  price: number | null;
}
const initialState: initialStateProps = {
  id: null,
  name: null,
  description: null,
  price: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (_state, action) => {
      return action.payload;
    },
    clearProduct: () => {
      return initialState;
    },
  },
});

export const { setProduct, clearProduct } = productSlice.actions;
export default productSlice.reducer;
export const selectProduct = (state: RootState) => state.product;
