const express = require('express');
const router = express.Router();
const cors = require('cors');

const supplierDetails = require('../models/datavendorinfo.model');

router.use(cors());
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  next();
});

// Login
router.post('/supplierlogin', (req,res)=>  {
  console.log(req.body);
  supplierDetails.findOne({
    where: {
        vendorEmail: req.body.email
    }
  })
  .then(user => {
    let response = {
        data: user,
        status: 200,
        statusCode:1,
        message:'Success'
    };
    console.log('Supplier = ', user);
    if (user) {
      if( req.body.password === response.data.vendorpwd ) {
        const usertype = 'Supplier';
        if (usertype === req.body.user_type) {
          const supplierName = user.vendorEmail.split("@")[0];
          console.log(supplierName);
           res.json({
             type: usertype,
             name: supplierName,
             id: user.vendorPK
           });
        } else {
          res.json({
            message : 'User do not exist'
          })
        }
      } else {
          response.data = null;
          response.status= 404;
          response.statusCode = 0;
          response.message = "Invalid Password";
          res.status(404).send(response);
      }
    } else {
      res.status(404).send("User does not exist");
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

router.get('/getSupplier', (req,res) => {
  supplierDetails.findAll().then(data => {
    if(data.length !== 0) {
      let supplier = [];
      for (let i of data) {
        supplier.push({
          name: i.vendorEmail.split("@")[0],
          id: i.vendorPK})
      }
        res.send(supplier);
    } else {
      res.status(404).send({message:'No user present with this type'});
    }
  }).catch( err => {
    res.send(err);
  })
})

module.exports = router
