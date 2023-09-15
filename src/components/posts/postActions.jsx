import { Box, Button } from "@mui/material";
import { FaEye, FaThumbsUp } from "react-icons/fa6";
import {
  useGetPostQuery,
  useLikePostMutation,
  useViewPostMutation,
} from "../../store/posts.slice";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function PostActions() {
  const location = useLocation();
  const { post_id } = location.state;
  const { data, refetch } = useGetPostQuery(post_id);
  const [likeTrigger, likeResult] = useLikePostMutation();
  const [viewTrigger, viewResult] = useViewPostMutation();

  useEffect(() => {
    if (data) refetch();
  }, [viewResult, likeResult]);
  function handleLike() {
    likeTrigger(post_id);
    viewTrigger(post_id);
  }
  function handleView() {
    viewTrigger(post_id);
  }
  return (
    <Box sx={{ display: "flex", gap: 1, marginBlockStart: 2 }}>
      <Button onClick={handleLike} variant="contained">
        <FaThumbsUp />
        <span style={{ marginInlineStart: "1rem" }}>
          {data?.post.metrics.likes}
        </span>
      </Button>
      <Button onClick={handleView} variant="contained">
        <FaEye />
        <span style={{ marginInlineStart: "1rem" }}>
          {data?.post.metrics.views}
        </span>
      </Button>
    </Box>
  );
}
