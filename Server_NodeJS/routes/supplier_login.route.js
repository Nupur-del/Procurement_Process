const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

const supplierDetails = require('../models/datavendorinfo.model');
const supplierInfo = require('../models/datavendor.model');
const supplierRegisteration = require('../models/supplierRegistration.model');
const supplierCategory = require('../models/suppcategory.model');

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
    yearofest: req.body.yearofest,
    licenseno: req.body.licenseno,
    isviewed: false,
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
    isVerified: false,
    isapproved: 'Pending'
  }
  
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
        let cateData = [];
        for (let i of req.body.categories) {
          let createdAttachment = {
                suppRegNo: user.dataValues.id,
                category:  i
            }
            cateData.push(createdAttachment);
        }
         supplierCategory.bulkCreate(cateData, {returning: true}).then(category => {

          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,
            {expiresIn: "1h"})
            const verifyUrl = `${origin}/verify-email?token=${token}`;
            let sendUser = {
              email: userData.email,
              password: req.body.password,
              subject: `Sign-up Verification API - Verify Email`,
              message: `<p>Please click the below link to verify your email address:</p>
              <p><a href="${verifyUrl}">${verifyUrl}</a></p>`
            }
            supplierRegisteration.update({
              token: token
            }, {
              returning: true,
              where: {
                id: user.id
              }
            }).then(done => {
              console.log(done);
              sendMail(sendUser, info => {
                console.log(`The mail has been send 😃 and the id is ${info.messageId}`);
                res.json({token: token});
              })
            })
         }).catch(erro2 => {
           res.send(erro2);
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
       user: 'vbnxcv50@gmail.com',
       pass: 'A@1bcdefgh'
      }
  });

  let mailOptions = {
    from: `Equimax`,
    to: input.email, // list of receivers
    subject: input.subject, // Subject line
    html: `<h4>Account activation</h4>
    <p>Thanks for registering!</p>
    ${input.message}`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);
  callback(info);
}

// Verify Email

router.post('/verify-email', (req, res) => {
    console.log(req);
    supplierRegisteration.findOne({
      where: {
        token: req.body.token
      }
    }).then(details => {
      if (!details) {
        res.status(404).send({
          error: 'Verification Failed'
        })
      } else {
        supplierRegisteration.update({
          token: '',
          isVerified: true
        },{returning: true, 
           where: {id: details.id}}).then(done => {
              res.json({
                message: 'Verification Successfull, wait for the approval from the Approver',
                isverified: true
              })
           })
      }
    })
})

// Login

router.post('/supplierlogin', (req,res)=>  {
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
      if(bcrypt.compareSync(req.body.password, user.vendorpwd)) {
        const token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: "1h"
        })
        const usertype = 'Supplier';
        if (usertype === req.body.user_type) {
          const supplierName = user.dataValues.vendorEmail.split("@")[0];
          console.log(supplierName);
           res.json({
             type: usertype,
             name: supplierName,
             id: user.dataValues.vendorPK,
             token: token
           });
        } else {
          res.status(404).json({
            message : 'User do not exist'
          })
        }
    } else {
      res.status(404).send("User does not exist");
    }
      } else {
        response.data = null;
        response.status= 404;
        response.statusCode = 0;
        response.message = "Invalid Password";
        res.status(404).send(response);
      }
  }).catch(err => {
    console.log('err = ',err);
    return res.status(500).send({
        message: "Error occurred while fetch the user"
      });
   });
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

router.put('/updateSupp', (req, res) => {
  const today = new Date();
  supplierRegisteration.update(
    {
       isapproved: req.body.isapproved
    },
    {
      returning: true,
      where: {
        id: req.body.id
      }
    }
  ).then(() => {
    supplierRegisteration.findOne({
      where: {
        id: req.body.id
      }
    }).then(result => {
      console.log(result);
      console.log(result.dataValues);

      const datavendor = { 
        venVendorPK: Math.floor(Math.random() * 10000) + 1,
        venName : result.dataValues.company_name,
        venAbbrName : result.dataValues.company_name,
        venYearOfEst : result.dataValues.yearofest, 
        venAffliationWithTcs : today,
        venRegistrationNo : result.dataValues.id,
        venLicenceNo : result.dataValues.licenseno,
        venIsActive : true
      }
  
      const datavendorinfo = {
        vendorPK  : Math.floor(Math.random() * 10000) + 1,
        vendorpwd   :    result.dataValues.password,
        vendorSecretQn : result.dataValues.ques ,
        vendorSecretAns  : result.dataValues.ans,
        vendorMobileNo : result.dataValues.mobile, 
        vendorOffLandLineNo: result.dataValues.mobile,
        vendorFaxNo  : result.dataValues.fax ,
        vendorEmail   : result.dataValues.email     
      }
  
      if (result.dataValues.isapproved === 'Approved') {
        supplierDetails.create(datavendorinfo).then(details => {  
          supplierInfo.create(datavendor).then(info => {
            let sendUser = {
              email: result.dataValues.email,
              password: result.dataValues.password,
              subject: `Regarding Equimax Account Approval`,
              message: `Yeah!!! Your registration has accepted. now you can login`
            }
            sendMail(sendUser, info => {
              console.log(`The mail has been send 😃 and the id is ${info.messageId}`);
              res.json({message: sendUser.message});
            })
            res.send(info);
          }).catch(error => {
            res.send(error);
          })
        }).catch(erro1 => {
          res.send(erro1);
        })
      }
      else {
        let sendUser = {
          email: result.dataValues.email,
          password: result.dataValues.password,
          subject: `Regarding Equimax Account Approval`,
          message: `Opps!!! Your registration has not accepted.`
        }
        sendMail(sendUser, info => {
          console.log(`The mail has been send 😃 and the id is ${info.messageId}`);
          res.json({message: sendUser.message});
        })
      }
    })
  }).catch(err => {
    res.status(400).send('No entry found');
  })
})

router.get('/getsuppbyid', (req, res) => {
  supplierRegisteration.findOne({
    where: {
      id: req.query.id
    }
  }).then(result => {
    if(result) {
      res.send(result);
    } else {
      res.status(404).send('Entry does not found');
    }
  }).catch(err => {
    res.send(err);
  })
})

router.get('/getCategories' , (req, res) => {
  supplierCategory.findAll({
    where: {
      suppRegNo: req.query.id
    }
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.send(err);
  })
})

router.put('/updateView', (req, res) => {
  let response = {
    result: '',
    status: 200
  };
  console.log(req.body);
  for (let i of req.body.id) {
    supplierRegisteration.update(
      {
        isviewed: req.body.isviewed,
      },
      {
        returning: true,
        where: {
          id: i
        }
      }
    ).then(data => {
      response.result = data;
      console.log(data);
    }).catch(err => {
      response.result = err;
      response.status = 404;
    })
  }
  res.send(response);
})

router.get('/getCountofPending' , (req, res) => {
  supplierRegisteration.findAndCountAll({
    where: {
      isVerified: true,
      isapproved: 'Pending',
      isviewed: false
    }
  }).then(data => {
    if(data.count !== 0) {
        res.send(data);
    } else {
      res.send({count: 0});
    }
  }).catch( err => {
    res.send(err);
  })
})

router.get('/getPending' , (req, res) => {
  supplierRegisteration.findAndCountAll({
    where: {
      isVerified: true,
      isapproved: 'Pending',
    },
    order: [
      ['id', 'DESC'],
    ],
  }).then(data => {
    if(data.count !== 0) {
        res.send(data);
    } else {
      res.send({count: 0});
    }
  }).catch( err => {
    res.send(err);
  })
})

module.exports = router
