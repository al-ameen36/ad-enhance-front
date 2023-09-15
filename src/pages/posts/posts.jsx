import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Posts() {
    const [formData, setFormData] = useState({ post: '' })

    function handleFormSubmit() {
        console.log(formData);
    }
    function handleDatachange(ev) {
        setFormData({ [ev.target.name]: ev.target.value })
    }

    return (
        <Container sx={{ maxWidth: "600px !important", paddingBlockStart: 6 }}>
            <Typography variant='h2' sx={{ textAlign: "center" }}>SandBox</Typography>
            <Box sx={{ marginBlockStart: 10 }}>
                <TextField
                    inputProps={{ maxLength: 290 }}
                    onChange={handleDatachange}
                    value={formData.post}
                    name='post'
                    id="outlined-textarea"
                    label="Add Post"
                    multiline
                    rows={4}
                    fullWidth
                />
                <Button
                    onClick={handleFormSubmit}
                    sx={{ marginBlockStart: 1 }} variant='contained'>Send Post</Button>
            </Box>
            <hr style={{ borderColor: "steelblue", opacity: 0.3, marginBlock: '3rem' }} />
            <Box>
                <Typography variant='h5'>No Posts Yet</Typography>
            </Box>
        </Container>
    )
}
