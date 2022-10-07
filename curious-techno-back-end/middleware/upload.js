const multer = require("multer");
const path = require('path');


// const imageFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb("Please upload only images.", false);
//   }
// };

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadFile = multer({
  storage: storage,
  limits:{fileSize:'1000000'},
  fileFilter: (req,file,cb)=>{
    const fileTypes = /jpeg|jpg|png|gif/
    const mimetype = fileTypes.test(file.mimetype)
    const extname = fileTypes.test(path.extname(file.originalname))
    if(mimetype && extname){
      return cb(null,true)
    }
    cb('Give proper file for upload')
  }

}).single('imageData')
module.exports = uploadFile;