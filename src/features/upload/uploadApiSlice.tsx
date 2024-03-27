import { apiSlice } from "../../app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    newUpload: builder.mutation({
      query: (credentials) => ({
        url: `/uploads/${credentials.id}`,
        method: "POST",
        body: credentials.formData,
      }),
    }),
    getImages: builder.query({
      query: (credentials) => `/uploads/${credentials.id}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useNewUploadMutation, useGetImagesQuery } = productApiSlice;
