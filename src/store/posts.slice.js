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
    likePost: builder.mutation({
      query: (post_id) => `/post/${post_id}/like`,
    }),
    viewPost: builder.mutation({
      query: (post_id) => `/post/${post_id}/view`,
    }),
    getComments: builder.query({
      query: (post_id) => `/post/${post_id}/comments`,
    }),
    addComment: builder.mutation({
      query: ({ post_id, comment }) => {
        console.log(comment);
        return {
          url: `/post/${post_id}/comments/`,
          method: "POST",
          headers: { "content-type": "application/json" },
          body: comment,
        };
      },
    }),
    generateAdvice: builder.mutation({
      query: (values) => ({
        url: `/report/generate/`,
        method: "POST",
        headers: { "content-type": "application/json" },
        body: values,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetCommentsQuery,
  useAddCommentMutation,
  useAddPostMutation,
  useLikePostMutation,
  useViewPostMutation,
  useDeletePostMutation,
  useGenerateAdviceMutation,
} = postsApi;
