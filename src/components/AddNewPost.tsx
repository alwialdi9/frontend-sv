import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddNewPost = () => {
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "", status: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleSave = async (status: string) => {
    newPost.status = status;
    try {
        setLoading(true);
        const response = await axios.post(`http://127.0.0.1:3000/api/article`, newPost);
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching posts:", error);
    } finally {
        setLoading(false);
    }
    navigate("/all-posts", { state: { successMessage: "Post Created successfully!" } }); // Navigate back to all posts
  };

  return (
    <Box padding={3}>
      <TextField
        label="Title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Content"
        value={newPost.content}
        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        label="Category"
        value={newPost.category}
        onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" onClick={() => handleSave("publish")} color="primary" style={{ marginRight: 10 }}>
        Publish
      </Button>
      <Button variant="outlined" onClick={() => handleSave("draft")} color="secondary">
        Draft
      </Button>
    </Box>
  );
};

export default AddNewPost;