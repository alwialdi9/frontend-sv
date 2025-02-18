import { createRoot } from 'react-dom/client'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Import Router
import './index.css'
import App from './App.tsx'
import Container from '@mui/material/Container';

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <Router> {/* Wrap App component with Router */}
  <Container maxWidth="md" fixed>
    <App />
  </Container>
  </Router>
);