const express = require('express');
const router = express.Router();
const cors = require('cors');

const User = require('../models/login.model');
router.use(cors());
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  next();
});

// Login
router.post('/login', (req,res)=>  {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user=> {
    let response = {
        data: user,
        status: 200,
        statusCode:1,
        message:'Success'
    };
    console.log('user = ',user);

    if( req.body.password === response.data.password ) {
        res.json({type: response.data.type})
      } else {
        response.data = null;
        response.status= 404;
        response.statusCode = 0;
        response.message = "User does not exist";
        return res.status(404).send(response);
      }
  }).catch(err => {
    console.log('err = ',err);
    return res.status(500).send({
        message: "Error occurred while fetch the user"
      });
   });
})

router.get('/auth', (req,res) => {
  User.findOne({
    where: {
      email: req.query.email,
      password: req.query.password
    }
  }).then(data => {
    if(data.length !== 0) {
        res.json({success: true})
    } else {
      res.json({message:'No user present with provided credentials'});
    }
  }).catch( err => {
    res.send(err);
  })
})

module.exports = router
