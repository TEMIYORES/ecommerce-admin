import { apiSlice } from "../../app/api/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        body: {},
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
