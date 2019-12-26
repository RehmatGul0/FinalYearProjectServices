const multer = require('multer');
const fs =require('fs');
var storageAdmin = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'ModelingData')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  var storageUser = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync('UserData/5decfef030a55e28905ec2c0')){
        fs.mkdirSync('UserData/5decfef030a55e28905ec2c0');
    }
      cb(null, 'UserData/5decfef030a55e28905ec2c0')
    },
    filename: function (req, file, cb) {
      cb(null, 'userDataSet.csv')
    }
  })
   
module.exports.uploadAdmin = multer({ storage: storageAdmin })
   
module.exports.uploadUser = multer({ storage: storageUser })