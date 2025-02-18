import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllPosts from "./components/AllPosts";
import AddNewPost from "./components/AddNewPost";
import EditPost from "./components/EditPost";
import PreviewPost from "./components/PreviewPost";

const RoutesComponent = () => (
    <Routes>
        <Route path="/" element={<AllPosts />} /> 
        <Route path="/all-posts" element={<AllPosts />} />
        <Route path="/add-new" element={<AddNewPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/preview" element={<PreviewPost />} />
    </Routes>
);

export default RoutesComponent;