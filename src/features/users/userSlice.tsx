import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface initialStateProps {
  name: string | null;
  picture: string | null;
  email: string | null;
}
const initialState: initialStateProps = {
  name: null,
  picture: null,
  email: null,
};
const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (_state, action) => {
      return action.payload;
    },
    clearUserInfo: () => {
      return initialState;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
export const selectUserInfo = (state: RootState) => state.userInfo;
