import React, { useState } from "react";
import "../css/Blog.css";
import { useNavigate, Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Blog = ({ post: { title, description,
	imagePath, uuid, user }, index }) => {
	let history = useNavigate();
	const [blogId, setBlogId] = useState()
	const onChange = (e) => {
		setBlogId(e.target.value)

	}
	if (blogId) {
		console.log(blogId)
		localStorage.setItem('blogId', blogId)
		history('/blog-details')
	}
	console.log(blogId)

	return (
		<div className="post-container">
			<h1 className="heading">{title}</h1>
			<img className="image" src={`http://localhost:5000/${imagePath}`} alt="post" />

			<Typography component="h4" color="red" >
				<Button name="blog-details" value={uuid} onClick={onChange} className="nav-link" style={{ "text-decoration": "none" }}>
					Read More....
				</Button>
			</Typography>
			{
				user ?
					<Typography component="h4" color="Black" >
						<div className="info">
							<h4>Written by: {user.username}</h4>
						</div>
					</Typography>
					:
					null
			}

		</div>
	);
};

export default Blog;
