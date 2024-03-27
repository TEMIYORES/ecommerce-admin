import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userInfo: builder.query({
      query: (credentials) => `/users/${credentials.id}`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useUserInfoQuery } = userApiSlice;
