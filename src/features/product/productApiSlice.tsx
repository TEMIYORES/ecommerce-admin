import { apiSlice } from "../../app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    newProduct: builder.mutation({
      query: (credentials) => ({
        url: "/products",
        method: "POST",
        body: credentials,
      }),
    }),
    updateProduct: builder.mutation({
      query: (credentials) => {
        return {
          url: "/products",
          method: "PUT",
          body: credentials,
        };
      },
    }),
    deleteProduct: builder.mutation({
      query: (credentials) => ({
        url: "/products",
        method: "DELETE",
        body: { ...credentials },
      }),
    }),
    products: builder.query({
      query: () => `/products`,
      keepUnusedDataFor: 5,
    }),
    product: builder.query({
      query: (credentials) => `/products/${credentials.id}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useNewProductMutation,
  useProductsQuery,
  useProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
