/* eslint-disable react/prop-types */
import { Box, Container, Typography } from "@mui/material";
import PostActions from "../../components/posts/postActions";
import Comments from "../comments/comments";
import {
  useGetCommentsQuery,
  useGetPostQuery,
  useGetPostsQuery,
} from "../../store/posts.slice";
import { useLocation } from "react-router-dom";
import PostMetrics from "../../components/posts/postMetrics";
import Loader from "../../components/loader";

export default function Post() {
  const location = useLocation();
  const { post_id } = location.state;
  const { data: post, status: postStatus } = useGetPostQuery(post_id);
  const { status: postsStatus } = useGetPostsQuery(post_id);
  const { status: commentStatus } = useGetCommentsQuery(post_id);

  return (
    <Container>
      {[postStatus, postsStatus, commentStatus].includes("pending") ? (
        <Loader />
      ) : null}
      <Box sx={{ paddingBlock: "3rem" }}>
        {post ? (
          <Box sx={{ display: "flex", gap: "4rem" }}>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, marginBlockEnd: 1 }}
              >{`${post.post.user_id.name}  @${post.post.user_id.username}`}</Typography>
              <Typography variant="h6" sx={{ maxWidth: "600px" }}>
                {post.post.content}
              </Typography>
              <PostActions />
              <Comments />
            </Box>
            <PostMetrics />
          </Box>
        ) : null}
      </Box>
    </Container>
  );
}
