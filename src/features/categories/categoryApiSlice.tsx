import { apiSlice } from "../../app/api/apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    newCategory: builder.mutation({
      query: (credentials) => ({
        url: "/categories",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    updateCategory: builder.mutation({
      query: (credentials) => ({
        url: "/categories",
        method: "PUT",
        body: { ...credentials },
      }),
    }),
    deleteCategory: builder.mutation({
      query: (credentials) => ({
        url: "/categories",
        method: "DELETE",
        body: { ...credentials },
      }),
    }),
    Categories: builder.query({
      query: () => `/categories`,
      keepUnusedDataFor: 5,
    }),
    category: builder.query({
      query: (credentials) => `/categories/${credentials.id}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useNewCategoryMutation,
  useCategoriesQuery,
  useCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
