const { sequelize } = require('./models')
const express = require('express')
const { render } = require('ejs');
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')
require("dotenv").config();

var corsOptions = {
    origin: '*',
  }


const app = express();

app.use(cors(corsOptions));

app.set('view engine','ejs');
app.use(express.static('public'));
// app.use('/public/', express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended : true})) 

app.use('/images',express.static('./images'))

app.get('/',(req,res)=>{
    res.redirect('/users/create')
    // res.render('home',{title:"Home Page"})
}) 

app.get('/about',(req,res)=>{
    res.render('about',{title : 'About'})
})

app.get('/login',(req,res)=>{
    res.render('login',{title : 'login'})
})

// Blogs Routes
app.use('/users/blogs',blogRoutes) 

// Users Routes
app.use('/users',userRoutes)


// 404 Page
app.use((req,res)=>{
    res.status(404).send({title : '404 Page Not-Found'})
})



app.listen({ port : process.env.PORT}, async() =>{

    console.log("Server Up on http://localhost:5000")
    await sequelize.sync()
    await sequelize.authenticate()
    console.log("Database Connected..")
})