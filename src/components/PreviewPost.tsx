import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Pagination } from "@mui/material";

const PreviewPost = () => {
  const posts = [
    { id: 1, title: "Post 1", content: "Content 1", category: "Tech" },
    { id: 2, title: "Post 2", content: "Content 2", category: "Lifestyle" },
    { id: 3, title: "Post 3", content: "Content 3", category: "Business" },
    { id: 4, title: "Post 4", content: "Content 4", category: "Food" },
    { id: 5, title: "Post 5", content: "Content 5", category: "Travel" },
  ];

  const [page, setPage] = useState(1);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.slice((page - 1) * 3, page * 3).map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(posts.length / 3)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
      />
    </div>
  );
};

export default PreviewPost;