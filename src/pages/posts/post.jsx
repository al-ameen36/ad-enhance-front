import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useLocation } from "react-router";
import { useGetPostQuery } from "../../store/posts.slice";

export default function Post() {
  const location = useLocation();
  const { post_id } = location.state;
  const { data: post, status: postStatus } = useGetPostQuery(post_id);

  return (
    <Container>
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
            </Box>
          </Box>
        ) : null}
      </Box>
    </Container>
  );
}
