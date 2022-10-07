import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Blog.css";
import Blog from "../blogs/Blog";

const YourBlog = () => {
    const user = JSON.parse(localStorage.getItem('userDetails'))
    const [blogs, setBlogs] = useState([])
    
    useEffect(() => {
        loadData()
    }, [])
    const loadData = async () => {
        console.log(user.uuid)
        const result = await axios.get(`http://localhost:5000/users/${user.uuid}`, { headers: { "Authorization": `Bearer ${user.token}` } });
        console.log(result);
        setBlogs(result?.data?.userData?.blogs);
    }
    console.log(blogs)
    return (
        <div className="posts-container">
	{blogs.map((post, index) => (
		<Blog key={index} index={index} post={post} />
	))}
	</div>

    );
};

export default YourBlog;
