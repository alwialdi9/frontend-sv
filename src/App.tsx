import React, { useState } from "react";
import { Box, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import RoutesComponent from "./routes";
import { useLocation, useNavigate } from "react-router-dom";

// Definisikan tipe data artikel
interface Article {
  id: number;
  title: string;
  content: string;
}

const App = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [newArticle, setNewArticle] = useState({ title: "", content: "" });

  const navigate = useNavigate(); // Hook to navigate to different routes
  const location = useLocation();

  const handleAddArticle = () => {
    const article = { id: articles.length + 1, title: newArticle.title, content: newArticle.content };
    setArticles([...articles, article]);
    setNewArticle({ title: "", content: "" });
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      // alignItems="start" 
      minHeight="100vh" 
      padding={2}
    >
      <h1>Article Management</h1>

      {/* Button to navigate to the "Add New Post" page */}
      {/* <Button
        variant="contained"
        color="primary"
        onClick={() => window.location.href = "/add-new"} // Navigate to /add-new
        sx={{ marginBottom: 2 }}
      >
        Add New Post
      </Button> */}
      {/* Conditionally render the button */}
      {location.pathname === "/add-new" || location.pathname === "/preview" || location.pathname.startsWith("/edit") ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/")}
            sx={{ marginBottom: 2 }}
          >
            Home
          </Button>
      ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/add-new")}
            sx={{ marginBottom: 2 }}
          >
            Add New Post
          </Button>
      )}

      {/* Form for adding article */}
      <Box marginBottom={2}>
        <RoutesComponent />
      </Box>
    </Box>
  );
};

export default App;