import React, {useState, useEffect} from "react";
import '../css/Blogs.css'
import Blog from "./Blog";
import axios from "axios";

const Blogs = () => {
	const [blogs, setBlogs] = useState([]);
    
    useEffect(() =>{
        console.log("MR Nimavat");
        loadUsers();
    },[]);
    
    const loadUsers = async() =>{
        let data = JSON.parse(localStorage.getItem('userDetails'));
        console.log(data.token)
        const result =  await axios.get("http://localhost:5000/users/blogs/allBlogs",  { headers: {"Authorization" : `Bearer ${data.token}`} });
        console.log(result.data.blogs);
        setBlogs(result.data.blogs);
    }

    // const deleteData = async (id) =>{
    //     await axios.delete(`http://localhost:3002/formdata/${id}`);
    //     loadUsers();
    // }
return (
	<div className="posts-container">
	{blogs.map((post, index) => (
		<Blog key={index} index={index} post={post} />
	))}
	</div>
);
};

export default Blogs;
