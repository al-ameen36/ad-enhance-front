import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `/posts`,
    }),
    getPost: builder.query({
      query: (post_id) => `/post/${post_id}`,
    }),
    addPost: builder.mutation({
      query: (values) => ({
        url: `/posts/add`,
        method: "POST",
        headers: { "content-type": "application/json" },
        body: values,
      }),
    }),
    deletePost: builder.mutation({
      query: (post_id) => ({
        url: `/post/${post_id}/delete`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostQuery,
} = postsApi;
