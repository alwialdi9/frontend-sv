import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  const [post, setPost] = useState({ title: "", content: "", category: "", status: "" });

  useEffect(() => {
    // Fetch the post data by ID (this is simulated with a static data for now)
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:3000/api/article/${id}`);
            console.log(response.data);
            setPost(response.data.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    }
    fetchData();
  }, [id]);

  const handleSave = (status: string) => {
    // Update post with new status
    console.log({ ...post, status });
    navigate("/all-posts"); // Navigate back to all posts
  };

  return (
    <Box padding={3}>
      <TextField
        label="Title"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Content"
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        label="Category"
        value={post.category}
        onChange={(e) => setPost({ ...post, category: e.target.value })}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" onClick={() => handleSave("publish")} color="primary">
        Publish
      </Button>
      <Button variant="outlined" onClick={() => handleSave("draft")} color="secondary">
        Draft
      </Button>
    </Box>
  );
};

export default EditPost;