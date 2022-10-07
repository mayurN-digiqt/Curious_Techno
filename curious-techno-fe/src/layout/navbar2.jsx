import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(10),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar2(props) {
  const classes = useStyles();
  let history = useNavigate();
  const {getUser} = props
  const Logout = async(req,res) =>{
    const  user = JSON.parse(localStorage.getItem("userDetails"))
    const response = await axios.get(`http://localhost:5000/users/logoutUser/${user.uuid}`)
    history(response.data.redirect)
    localStorage.clear()
    getUser(response)
  }
  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Curious Techno
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/home" className={classes.link}>
              Home
            </Link>
            <Link to="/user-details" className={classes.link}>
              Profile
            </Link>
            <Link to="/user-blogs" className={classes.link}>
              Your Blogs
            </Link>
            <Link to="/create-blog" className={classes.link}>
              Create Blog
            </Link>
            <Link to="/about" className={classes.link}>
              About
            </Link>
            <Link to="/" onClick={Logout} className={classes.link}>
              Logout
            </Link>
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar2;