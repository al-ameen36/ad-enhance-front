import { Box, Button, Typography } from "@mui/material";
import {
  useGenerateAdviceMutation,
  useGetCommentsQuery,
  useGetPostQuery,
} from "../../store/posts.slice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../loader";

export default function PostMetrics() {
  const location = useLocation();
  const [postPerformance, setPostPerformance] = useState(0);

  const { post_id } = location.state;
  const { data: post, refetch: postRefetch } = useGetPostQuery(post_id);
  const [adviceTrigger, advice] = useGenerateAdviceMutation();
  const { data, refetch: getComments } = useGetCommentsQuery(post_id);

  let negative_comments = [];
  let positive_comments = [];
  data?.comments.forEach((c) =>
    c.sentiment === "positive"
      ? positive_comments.push(c)
      : negative_comments.push(c)
  );
  useEffect(() => {
    if (post?.post.metrics.views !== 0)
      setPostPerformance(
        (
          ((post?.post.metrics.likes +
            positive_comments.length -
            negative_comments.length) /
            post?.post.metrics.views) *
          100
        ).toFixed(2)
      );
  }, [data, post, advice.isLoading]);

  function handleGenerateAdvice() {
    if (data?.comments?.length) {
      adviceTrigger({
        advert: post.post.content,
        comments: data.comments,
      }).then(() => postRefetch());
      getComments();
    }
  }
  return (
    <Box
      sx={{
        marginBlockEnd: 2,
        position: "sticky",
        top: 0,
        right: 0,
        height: "100%",
        paddingBlockStart: 4,
        width: "50%",
      }}
    >
      {advice.isLoading ? <Loader /> : null}
      <Box sx={{ marginBlockEnd: 2, display: "flex", gap: 3 }}>
        <Typography fontWeight={800}>
          Positive Comments: {positive_comments.length}
        </Typography>
        <Typography fontWeight={800}>
          Negative Comments: {negative_comments.length}
        </Typography>
      </Box>
      <Box sx={{ marginBlockEnd: 2 }}>
        <Typography>
          Formula used: (likes + positive comments - negative comments) / views{" "}
        </Typography>
        <br />
        <Typography fontWeight={800}>
          Current Performance: {postPerformance}%
        </Typography>
      </Box>
      <Button variant="contained" onClick={handleGenerateAdvice}>
        Generate Advice
      </Button>
      <br />
      {advice?.data?.advice ? (
        <Box
          sx={{
            borderRadius: 2,
            backgroundColor: "steelblue",
            color: "#fff",
            padding: 2,
            marginBlockStart: "4rem",
          }}
        >
          <Box
            sx={{ font: "1rem sans-serif" }}
            dangerouslySetInnerHTML={{ __html: advice.data.advice }}
          ></Box>
        </Box>
      ) : null}
    </Box>
  );
}
