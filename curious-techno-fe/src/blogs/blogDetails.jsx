import axios from "axios";
import React, {useEffect, useState} from "react";
import "../css/Blog.css";
import Typography from '@mui/material/Typography';

const BlogDetails = () => {
    const [blogDetails,setBlogDetails] = useState({blogdata:''})
    useEffect(()=>{
        blogDetailsLoad()
    },[])
    const blogDetailsLoad = async() =>{
        const id = localStorage.getItem("blogId");
        const useData = JSON.parse(localStorage.getItem('userDetails'))
        const blogData = await axios.get(`http://localhost:5000/users/blogs/${id}`,{ headers: {"Authorization" : `Bearer ${useData.token}`}})
        const blog = blogData.data.blog;
        setBlogDetails({...blogDetails,blogdata:blog})
    }
    console.log(blogDetails.blogdata.title)
	return (
		<div className="post-container">
			<h1 className="heading">{blogDetails.blogdata.title}</h1>
			<img className="image" src={`http://localhost:5000/${blogDetails.blogdata.imagePath}`} alt="post" />
			
				<Typography component="h4" color="red" >
					{blogDetails.blogdata.description}
				</Typography>
			<Typography component="h4" color="Black" >
				<div className="info">
					{/* <h4>Written by: {blogDetails.blogdata.user.username}</h4> */}
				</div>
			</Typography>
            {/* <Button>
                Delete Blog
            </Button> */}
		</div>
	);
};

export default BlogDetails;
