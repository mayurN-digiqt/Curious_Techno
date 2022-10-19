import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/layout/navbar";
import Navbar2 from "./layout/navbar2";
import Footer from "./layout/footer";
import HomePage from "./component";
import LoginPage from "./login/loginUser";
import CreateUser from "./users/createUser";
import Blogs from "./blogs/Blogs";
import CreateBlog from "./blogs/createBlog";
import Errors from "./component/404";
import BlogDetails from "./blogs/blogDetails";
import UserDetails from "./users/userDetails";
import About from "./component/about";
import YourBlog from "./users/yourBlog";

function App() {
  const [data, setData] = useState(true);
  const getUser = (data) => {
    console.log(data);
    if (localStorage.getItem("userDetails")) {
      console.log(true);
      setData(false);
    } else {
      console.log(false);
      setData(true);
    }
  };
  console.log("call");
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Router>
      {data ? <Navbar /> : <Navbar2 getUser={getUser} />}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage getUser={getUser} />} />
        <Route path="/sign-up" element={<CreateUser />} />
        <Route path="/home" element={<Blogs />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blog-details" element={<BlogDetails />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/user-blogs" element={<YourBlog />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Errors />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
