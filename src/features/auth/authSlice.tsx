import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { RootState } from "../../app/store";

interface initialStateProps {
  id: string | null;
  accessToken: string | null;
  roles: string[] | null;
}

const initialState: initialStateProps = {
  id: null,
  accessToken: null,
  roles: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
      const decoded: { userInfo: { id: string; roles: string[] } } =
        accessToken && jwtDecode(accessToken);
      state.id = decoded?.userInfo.id;
      state.roles = decoded?.userInfo?.roles;
    },
    removeAuth: (state) => {
      state.id = null;
      state.accessToken = null;
      state.roles = null;
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentId = (state: RootState) => state.auth.id;
export const selectCurrentRoles = (state: RootState) => state.auth.roles;
