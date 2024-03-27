import { apiSlice } from "../../app/api/apiSlice";

export const refreshApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    refresh: builder.query({
      query: () => `/refresh`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useRefreshQuery } = refreshApiSlice;
