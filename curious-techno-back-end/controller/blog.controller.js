const models = require('../models')
const fs = require("fs");
var util = require("util"); 
const path = require('path');
const { successData, errorData } = require('../utils/utils')

 
const getAllBlogs = async(req,res) => {

    try{
        var token = req.params
        const blogs =  await models.blogs.findAll({include:['user']})
       if(!blogs){
        return res.status(404).json({error:"Not Found"})
       }
       return successData(res, {msg:"GET ALL BLOGS",blogs:blogs} );
     
}
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Something wrong"})
    }
}

const newBlog = async (req,res) => {
    const uuid = req.params.uuid;
    console.log(uuid)
    try{
       const user =  await models.User.findOne(
           {
               where:{uuid},
            //    include:"posts"
           }
       );
    //    console.log(user.posts.imageData)
    return successData(res, {msg:"Successfully Redirect",user:user} );

    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Something wrong"})
    }
}

const createBlog = async (req,res) =>{
    // const { mimetype } = req.file;
    // const filepath = req.file.path
    const {title, description,uuid} = req.body;
    // console.log(req.file.path)
    const user =  await models.User.findOne({ where:{uuid} });
    
    const blog = await models.blogs.create({
                        title: title,
                        description: description,
                        userId: user.id, 
                        // imageType: mimetype,
                        // imagePath: filepath,
                       })
                    console.log(blog)
                // return res.redirect(`/users/${user.uuid}`);
                return successData(res, {msg:"Blog Created",blog:blog} );
 
}

const uploadImage = async (req,res) =>{
    const { mimetype } = req.file;
    const filepath = req.file.path
    const {uuid} = req.params;
    console.log(req.file.path)
    const blog =  await models.blogs.findOne({ where:{uuid} });
    
    blog.imagePath = filepath;
    blog.imageType = mimetype;
    await blog.save();
                    console.log(blog)
                // return res.redirect(`/users/${user.uuid}`);
                return successData(res, {msg:"Blog Created",blog:blog} );
 
}

const getBlog = async (req,res) => {
    const uuid = req.params.uuid;
    try{
       const blog =  await models.blogs.findOne(
           {
               where:{uuid},
               include:"user"
           }
       )
    //    console.log(blog.imagePath)
        // res.render('blog_details',{blog: blog,title: "User Details"})
        return successData(res, {msg:"Get Blog Details Successfully",blog:blog} );

    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Something wrong"})
    }
}

const deleteBlog = async (req,res)=>{
   
    try{
        const uuid = req.params.uuid;
        const user =  await models.blogs.findOne({where:{uuid},});
        user.destroy();
        // res.json({ redirect : '/users' });
        return successData(res, {msg:"Blog are Deleted"} );

    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Something wrong"})
    }
}



module.exports = {
    getAllBlogs,
    getBlog,
    newBlog,
    uploadImage,
    createBlog,
    deleteBlog
}