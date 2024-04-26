import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { setAuth } from "../../features/auth/authSlice";
import { clearUserInfo } from "../../features/users/userSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://ecommart.glitch.me/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().auth.accessToken;
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (args === "/refresh" && result?.data) {
    console.log({ result });
    api.dispatch(setAuth({ ...result?.data }));
    //   Retry Original query with new accessToken
    result = await baseQuery(args, api, extraOptions);
  } else {
    api.dispatch(clearUserInfo());
  }
  //   if accessToken has expired
  console.log(result?.error?.status);
  if (result?.error?.status === 401) {
    // Request a new accessToken with the RefreshToken
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log({ refreshResult });
    if (refreshResult?.data) {
      api.dispatch(setAuth({ ...refreshResult.data }));
      //   Retry Original query with new accessToken
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearUserInfo());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
