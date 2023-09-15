import { Box, Button, TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useAddCommentMutation,
  useGetCommentsQuery,
  useGetPostQuery,
  useViewPostMutation,
} from "../../store/posts.slice";
import Loader from "../../components/loader";

export default function Comments() {
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const { post_id } = location.state;

  const [viewTrigger, viewResult] = useViewPostMutation();
  const {
    data,
    status: commentStatus,
    refetch: getComments,
  } = useGetCommentsQuery(post_id);
  const { refetch } = useGetPostQuery(post_id);
  const [addCommentTrigger] = useAddCommentMutation();

  useEffect(() => {
    refetch();
    getComments();
  }, [data, viewResult]);
  async function handleSubmit() {
    if (formData.comment) {
      viewTrigger(post_id);
      addCommentTrigger({ post_id, comment: formData }).then(() => {
        refetch();
        getComments();
      });
      setFormData({});
    }
  }
  function handleChange(ev) {
    setFormData((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
  }

  return (
    <Box>
      {[viewResult?.status, commentStatus].includes("pending") ? (
        <Loader />
      ) : null}
      <Box sx={{ marginBlockStart: 3 }}>
        <Box sx={{ "&>*": { marginBlockEnd: "1rem !important" } }}>
          <TextField
            onChange={handleChange}
            value={formData.comment || ""}
            id="outlined-multiline-static"
            label="Comment"
            multiline
            rows={4}
            fullWidth
            name="comment"
          />
          <Button onClick={handleSubmit} variant="contained">
            Send Comment
          </Button>
        </Box>
      </Box>
      {data?.comments
        ? data.comments.map((c) => (
            <Box
              key={"comment_" + c.id}
              sx={{
                marginBlockEnd: 1,
                padding: 2,
                backgroundColor: "#f6f6f6",
                borderInline:
                  c.sentiment === "positive"
                    ? "15px solid yellowgreen"
                    : "15px solid tomato",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  textTransform: "capitalize",
                  marginBlockEnd: 1,
                }}
              >
                {c.sentiment} comment
              </Typography>
              <Typography>{c.content}</Typography>
            </Box>
          ))
        : null}
    </Box>
  );
}
