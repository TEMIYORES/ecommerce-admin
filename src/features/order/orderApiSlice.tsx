import { apiSlice } from "../../app/api/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    orders: builder.query({
      query: () => `/orders`,
      keepUnusedDataFor: 5,
    }),
    order: builder.query({
      query: (credentials) => `/orders/${credentials.id}`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useOrdersQuery, useOrderQuery } = orderApiSlice;
