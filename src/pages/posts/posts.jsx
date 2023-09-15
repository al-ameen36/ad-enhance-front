import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAddPostMutation, useGetPostsQuery } from "../../store/posts.slice";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";

export default function Posts() {
  const [formData, setFormData] = useState({ post: "" });
  const { data, refetch } = useGetPostsQuery();
  const [addTrigger, addResult] = useAddPostMutation();

  useEffect(() => {
    refetch();
  }, [addResult]);
  function handleFormSubmit() {
    if (formData.post !== "") {
      addTrigger({ user_id: 2, content: formData.post });
      setFormData({ post: "" });
    }
  }
  function handleDatachange(ev) {
    setFormData({ [ev.target.name]: ev.target.value });
  }

  function handleDelete(post_id) {
    console.log(post_id);
  }

  let postElements = data?.posts.map((p) => (
    <Box key={p.id} sx={{ marginBlockEnd: 5 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, marginBlockEnd: 1 }}
      >{`${p.user_id.name}  @${p.user_id.username}`}</Typography>
      <Link to={"post/"} state={{ post_id: p.id }}>
        <Typography variant="h6">{p.content.substring(0, 280)}...</Typography>
      </Link>
      <Button
        onClick={() => handleDelete(p.id)}
        sx={{ marginBlockStart: "1rem" }}
        variant="contained"
      >
        <FaTrash />{" "}
      </Button>
    </Box>
  ));

  return (
    <Container sx={{ maxWidth: "600px !important", paddingBlockStart: 6 }}>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        SandBox
      </Typography>
      <Box sx={{ marginBlockStart: 10 }}>
        <TextField
          inputProps={{ maxLength: 290 }}
          onChange={handleDatachange}
          value={formData.post}
          name="post"
          id="outlined-textarea"
          label="Add Post"
          multiline
          rows={4}
          fullWidth
        />
        <Button
          onClick={handleFormSubmit}
          sx={{ marginBlockStart: 1 }}
          variant="contained"
        >
          Send Post
        </Button>
      </Box>
      <hr
        style={{ borderColor: "steelblue", opacity: 0.3, marginBlock: "3rem" }}
      />
      <Box>
        {data?.posts.length ? (
          postElements
        ) : (
          <Typography variant="h5">No Posts Yet</Typography>
        )}
      </Box>
    </Container>
  );
}
