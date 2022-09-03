const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, path.join(__dirname,"../uploads"));
    },
    filename: function (req, file, callback) {
      const uniquePrefix = Date.now() + '-' + Math.round()
      callback(null,uniquePrefix + '-' + file.originalname)
    }
  })

  
  function fileFilter (req, file, callback) {
   if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){ 
       callback(null, true)
   }else{
       callback(new Error("Something Went Wrong"), false)
   }
  } 


  const upload = multer({storage,fileFilter,limits:{
      fileSize:1024*1021*10
  }});


  // const uploadSingle = (fileKey)=>{
  //     return function(req,res,next){
  //         const uploadItem = upload.single(fileKey);

  //         uploadItem(req, res, function (err) {
            
  //           if (err instanceof multer.MulterError) {
  //             console.log(err)
  //             return res.status(501).send(err);

  //           } else if(err) {
  //             console.log(err)
  //             return res.status(502).send(err);
  //           }
  //           next();
  //         })
  //     }
  // }



  module.exports = {upload};


