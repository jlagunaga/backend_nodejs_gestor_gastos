var multer = require('multer');


var dirUpl=__dirname.replace(/lib/g,"storage/img");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dirUpl)
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
   


  const upload = multer({ storage: storage })


  module.exports=upload;