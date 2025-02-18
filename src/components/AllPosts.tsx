import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Pagination,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const [totalPages, setTotalPages] = useState<number>(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Fetch posts from the backend with limit and offset
    setLoading(true);
    if (location.state?.successMessage) {
        setMessage(location.state.successMessage);
        setOpenSnackbar(true);
        setTimeout(() => {
            setMessage("");
            // Reset location.state manually without triggering navigation
            window.history.replaceState({}, document.title);
          }, 100);
    }
    fetchPosts(tabIndex);
    setLoading(false);
  }, [currentPage, postsPerPage, location.state]);

  const fetchPosts = async (tabIndex: number) => {
    try {
      
      const offset = (currentPage - 1) * postsPerPage;
      var statusTab = "publish";
      if (tabIndex === 1) {
        statusTab = "draft";
      } else if (tabIndex === 2) {
        statusTab = "thrash";
      }
      const response = await axios.get(
        `http://127.0.0.1:3000/api/article/${statusTab}/${postsPerPage}/${offset}`
      );

      // Assuming the API provides the total count of posts in the response
      setPosts(response.data.data);
      setTotalPages(Math.ceil(response.data.total / postsPerPage)); // Set total posts if provided
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    fetchPosts(newValue)
  };

  const handleTrashPost = (id: number) => {
    const deleteData = async () => {
      try {
        setLoading(true)
        const response = await axios.delete(
          `http://127.0.0.1:3000/api/article/${id}`
        );
        console.log(response.data);
        if (response.data.status == 'success') {
            setOpenSnackbar(true);
            setMessage("Post Deleted Successfully");
        }
      } catch (error) {
        console.log("Error deleting post:", error);
      }
    };
    deleteData();
    setTabIndex(2);
    setLoading(false)
  };

  const handleEditPost = (id: number) => {
    // Route to Edit Page (implement routing in App.tsx)
    navigate("/edit/" + id);
  };

  const handleCloseSnackbar = () => {
    navigate(location.pathname, { replace: true, state: {} });
    setOpenSnackbar(false);
    setMessage("");
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value);
    };

  const filteredPosts = posts.filter((post) => {
    if (tabIndex === 0) return post.status === "publish";
    if (tabIndex === 1) return post.status === "draft";
    return post.status === "thrash";
  });

  return (
    <div>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="Tabs for posts"
      >
        <Tab label="Published" />
        <Tab label="Drafts" />
        <Tab label="Trashed" />
      </Tabs>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                    { loading ? 
                        <></>
                        : <IconButton onClick={() => handleTrashPost(post.id)}>
                        <Delete />
                    </IconButton>
                    }
                  </TableCell>
                </TableRow>
              ))}

          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
      />

      {/* Snackbar Notification */}
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {message}
            </Alert>
        </Snackbar>
            
    </div>
  );
};

export default AllPosts;
