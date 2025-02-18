import React, { useEffect, useState } from "react";
import { Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  status: "publish" | "draft" | "thrash";
}

const AllPosts = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1); // Track current page
  const [postsPerPage] = useState<number>(5); // Number of posts per page
  const [totalPosts, setTotalPosts] = useState<number>(0);

  useEffect(() => {
    // Fetch posts from the backend with limit and offset
    const fetchPosts = async () => {
      try {
        const offset = (currentPage - 1) * postsPerPage;
        const response = await axios.get(`http://127.0.0.1:3000/api/article/${postsPerPage}/${offset}`);
        console.log(response.data);
        
        // Assuming the API provides the total count of posts in the response
        setPosts(response.data.data); 
        setTotalPosts(response.data.total); // Set total posts if provided
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, postsPerPage]);
  
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleTrashPost = (id: number) => {
    const deleteData = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:3000/api/article/${id}`);
            console.log(response.data);
        } catch (error) {
            console.log("Error deleting post:", error);
        }
    }
    deleteData()
    navigate("/"); // Refresh the page
  };

  const handleEditPost = (id: number) => {
    // Route to Edit Page (implement routing in App.tsx)
    navigate("/edit/"+id);
  };

  const filteredPosts = posts.filter(post => {
    if (tabIndex === 0) return post.status === "publish";
    if (tabIndex === 1) return post.status === "draft";
    return post.status === "thrash";
  });

  return (
    <div>
      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Tabs for posts">
        <Tab label="Published" />
        <Tab label="Drafts" />
        <Tab label="Trashed" />
      </Tabs>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditPost(post.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleTrashPost(post.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllPosts;