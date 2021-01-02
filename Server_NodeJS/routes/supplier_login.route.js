const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

const supplierDetails = require('../models/datavendorinfo.model');
const supplierInfo = require('../models/datavendor.model');
const supplierRegisteration = require('../models/supplierRegistration.model');

process.env.SECRET_KEY = 'secret';

router.use(cors());
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  next();
});

//Register
router.post('/supplierRegistration' , (req,res) => {
  const userData = {
    company_name: req.body.company_name,
    country: req.body.country,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    postalCode: req.body.postalCode,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    website: req.body.website,
    tax: req.body.tax,
    lang: req.body.lang,
    ques: req.body.ques,
    ans: req.body.ans,
    mobile: req.body.mobile,
    fax:req.body.fax,
    acceptTerms:req.body.acceptTerms,
  }

  console.log(req.body);
  console.log(req.get('origin'));
  supplierRegisteration.findOne({
    where: {
      email: req.body.email
    }
  }).then(vendor => {
    if (!vendor || vendor.length === 0) {
      var origin = req.get('origin')
      const hash = bcrypt.hashSync(userData.password, 10)
      userData.password = hash
      supplierRegisteration.create(userData)
      .then(user => {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,
        {expiresIn: 1440})
        const verifyUrl = `${origin}/verify-email?token=${token}`;
        let sendUser = {
          email: userData.email,
          password: req.body.password,
          message: `<p>Please click the below link to verify your email address:</p>
          <p><a href="${verifyUrl}">${verifyUrl}</a></p>`
        }
        sendMail(sendUser, info => {
          console.log(`The mail has been send 😃 and the id is ${info.messageId}`);
          res.json({token: token});
        })
      }).catch(error => {
        res.send('error:' + error)
      })
    } else {
      res.status(409).send({message: 'Account with this email Id already present'});
    }
  }).catch(err => {
    res.send(err);
  })
})


async function sendMail(input, callback) {
  // create reusable transporter object using the default SMTP transport
  console.log(input);
  let transporter = nodemailer.createTransport({
     service: "gmail",
     auth: {
       user: input.email,
       pass: input.password
      }
  });

  let mailOptions = {
    to: input.email, // list of receivers
    subject: `Sign-up Verification API - Verify Email`, // Subject line
    html: `<h4>Verify Email</h4>
    <p>Thanks for registering!</p>
    ${input.message}`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);
  callback(info);
}

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
          id: i.vendorPK,
          email: i.vendorEmail
        })
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
