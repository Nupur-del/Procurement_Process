const multer = require("multer");
const express = require("express");
const router = express.Router();
const fs = require('fs');
// const { promisify } = require('util')
// const unlinkAsync = promisify(fs.unlink)

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    next();
  });
var DIR = './uploads/';
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-upload-${file.originalname}`);
    },
});

//define the type of upload multer would be doing and pass in its destination, in our case,

var upload = multer({storage: storage}).array('file', 3);

//our file upload function.
router.post('/upload', function (req, res, next) {
     upload(req, res, function (err) {
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.json({
              message: err.message
          })
        }  
       // No error occured.
       console.log(req.files);
        return res.json({
            file : req.files,
            message: 'Image uploaded successfully'}); 
  });     
})

router.delete('/deleteFile', (req,res) => {
    var path = DIR + req.query.fileName;
    console.log("Path to delete", path);
    fs.unlink(path, (err) => {
        if(err) {
            console.log(err);
            res.json({error: err});
        } else {
            res.json({message: 'Deleted the file Successfully'});
        }
    })
})

module.exports = router;
