const express = require('express')
const blogController = require('../controller/blog.controller')  
const router = express.Router()
const uploadFile = require('../middleware/upload')
const app = express();
const verifyToken = require('../middleware/auth.middleware')

// blog 

router.get('/allBlogs', verifyToken,blogController.getAllBlogs);     

router.post('/', [verifyToken],blogController.createBlog)

router.post('/image-upload/:uuid',[uploadFile],blogController.uploadImage)

router.get('/create-blog/:uuid', verifyToken,blogController.newBlog)

router.get('/:uuid', verifyToken,blogController.getBlog)

router.delete('/:uuid', verifyToken,blogController.deleteBlog)

module.exports = router;