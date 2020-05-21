var express =   require('express');
var router  =   express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null,  file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });
  

let saveBase64Controller    =   require('./testsavebase64');
let uploadImageFile         =   require('./uploadFile').uploadFile;
let getAllImagePaths        =   require('./uploadFile').getAllFiles;
let getImageOnId        =   require('./uploadFile').getImageOnId;
router.post('/savebase64file',saveBase64Controller);

router.post("/uploadfile", upload.single('productImage'),uploadImageFile);
router.get('/getAllImagePaths',getAllImagePaths);
router.get("/getimage/:productId", getImageOnId);

module.exports  =   router;
