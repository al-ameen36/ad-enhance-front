import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `/posts`,
    }),
    addPost: builder.mutation({
      query: (values) => ({
        url: `/posts/add`,
        method: "POST",
        headers: { "content-type": "application/json" },
        body: values,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation } = postsApi;
