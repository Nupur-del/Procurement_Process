const express = require('express');
const router = express.Router();
const cors = require('cors');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const nodemailer = require("nodemailer");

const Datavendorinfo = require('../models/datavendorinfo.model');
const Datavendor = require('../models/datavendor.model');
const supplierCategory = require('../models/suppcategory.model');

router.use(cors());
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  next();
});

//Register
router.post('/supplierRegistration' , (req,res) => {

  const DatavendorinfoData = {
    vendorEmail: req.body.email,
    vendorpwd: req.body.password,
    vendorSecretQn: req.body.ques,
    vendorSecretAns: req.body.ans,
    vendorMobileNo: req.body.mobile,
    vendorFaxNo: req.body.fax,
    vencountry: req.body.country,
    venaddress: req.body.address,
    vencity: req.body.city,
    venstate: req.body.state,
    venpostalCode: req.body.postalCode,
    venperson: req.body.name,
    venisViewed: false,
    venwebsite: req.body.website,
    ventax: req.body.tax,
    venlang: req.body.lang,
    venacceptTerms:req.body.acceptTerms,
    venisVerified: false,
    venisapproved: 'Pending'
  }

  const datavendorData = {
    venLicenceNo: req.body.licenseno,
    venYearOfEst: req.body.yearofest,
    venIsActive: false,
    venName: req.body.company_name,
    venAbbrName: req.body.company_name,
  }
  
  Datavendorinfo.findOne({
    where: {
      vendorEmail: req.body.email
    }
  }).then(vendor => {
    if (!vendor || vendor.length === 0) {
      var origin = req.get('origin')
      const hash = bcrypt.hashSync(DatavendorinfoData.vendorpwd, 10)
      DatavendorinfoData.vendorpwd = hash
      Datavendor.create(datavendorData)
       .then(user => {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,
          {expiresIn: "1h"})
          const verifyUrl = `${origin}/verify-email?token=${token}`;
        let Ldata = {
          venVendorFK: user.venVendorPK,
          ventoken: token,
          ...DatavendorinfoData
        }
        Datavendorinfo.create(Ldata).then(email => {
        let cateData = [];
        for (let i of req.body.categories) {
          let createdAttachment = {
                suppRegNo: email.dataValues.vendorPK,
                category:  i
            }
            cateData.push(createdAttachment);
        }
         supplierCategory.bulkCreate(cateData, {returning: true}).then(category => {
                      let sendUser = {
                        email: DatavendorinfoData.vendorEmail,
                        password: req.body.password,
                        subject: `Sign-up Verification API - Verify Email`,
                        message: `<p>Please click the below link to verify your email address:</p>
                        <a href="${verifyUrl}"><button style="background-color: orange">Verify your Email</button></a>`
                      }
                        sendMail(sendUser, info => {
                            console.log(`The mail has been send 😃 and the id is ${info.messageId}`);
                            res.json({token: token});
                        })
            }).catch(e => {
              console.log(e);
              res.send(e); 
            })
         }).catch(erro2 => {
          console.log(erro2); 
          res.send(erro2);
        })
      }).catch(error => {
        console.log(error);
        res.send('error:' + error)})
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
       user: process.env.ADMIN_USERNAME,
       pass: process.env.ADMIN_PASSWORD
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
    Datavendorinfo.findOne({
      where: {
        ventoken: req.body.token
      }
    }).then(details => {
      if (!details) {
        res.status(404).send({
          error: 'Verification Failed'
        })
      } else {
        Datavendorinfo.update({
          ventoken: '',
          venisVerified: true
        },{returning: true, 
           where: {
             vendorPK: details.vendorPK
            }
          })
           .then(done => {
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

  Datavendorinfo.findOne({
    where: {
      vendorEmail: req.body.email
    }
  }).then(result => {
     Datavendor.findOne({
       where: {
        venVendorPK: result.venVendorFK
       }
     }).then(suppData => {
          // } else {
              let response = {
                  data: result,
                  status: 200,
                  statusCode:1,
                  message:'Success'
              };
              console.log('Supplier = ', result);
              if (result) {
                if(bcrypt.compareSync(req.body.password, result.vendorpwd)) {
                  // const token = jwt.sign(suppData.dataValues, process.env.SECRET_KEY, {
                  //   expiresIn: "1h"
                  // })
                  const usertype = 'Supplier';
                  if (usertype === req.body.user_type) {
                    if (result.venisVerified === false) {
                        res.send({
                          message: "Email is yet not verified. Please check your mail to verify or click on resend button"
                        })
                      } else if (result.venisapproved === 'Pending') {
                        res.send({
                          message: "Account is not yet approved. Please check your mail for the approval"
                        })
                      } else if (result.venisapproved === 'Denied') {
                          res.send({
                            message: "Approver has not accepted your registration request. Please check your mail for the more information"
                        })
                      } else {
                        res.json({
                          type: usertype,
                          name: suppData.venName,
                          id: suppData.venVendorPK
                          // token: token
                        });
                      }
                  } else {
                    res.status(404).json({
                      message : 'User do not exist'
                    })
                  }
              } else {
                res.status(404).send("Invalid Password");
              }
                } else {
                  response.data = null;
                  response.status= 404;
                  response.statusCode = 0;
                  response.message = "User doesnot exist";
                  res.status(404).send(response);
                }
          // }     
     }).catch(error => {
       res.status(404).send(error);
     })
  }).catch(err3 => {
    console.log('err = ',err3);
    res.status(500).send({
        message: "Error occurred while fetch the user"
      });
  });
})

router.get('/getSupplier', (req,res) => {
  Datavendorinfo.findAll({
    where: {
      venisapproved: 'Approved'
    }
  }).then(info => {
    let ids = [];
    for (let i of info) {
      ids.push(i.venVendorFK);
    }
    console.log('ID',ids);
    Datavendor.findAll({
      where: {
        venVendorPK: {
          [Op.in] : ids
        }
      }
    }).then(data => { 
      if(data.length !== 0) {
        let supplier = [];
        for (let i of data) {
          supplier.push({
            name: i.venName,
            id: i.venVendorPK
          })
        }
          res.send(supplier);
      } else {
        res.status(404).send({message:'No user present with this type'});
      }
    }).catch( err => {
      res.send(err);
    })
  }).catch(error => {
    res.status(400).send(error);
  })
})

router.put('/updateSupp', (req, res) => {
  const today = new Date();
  Datavendorinfo.update(
    {
       venisapproved: req.body.isapproved
    },
    {
      returning: true,
      where: {
        venVendorFK: req.body.id
      }
    }
  ).then(info => {
    Datavendorinfo.findOne({
      where: {
        venVendorFK: req.body.id
      }
    }).then(result => {
      if (req.body.isapproved === 'Approved') { 
            let sendUser = {
              email: result.dataValues.vendorEmail,
              password: result.dataValues.vendorpwd,
              subject: `Regarding Equimax Account Approval`,
              message: `Yeah!!! Your registration has accepted. now you can login`
            }
            sendMail(sendUser, info => {
              console.log(`The mail has been send 😃 and the id is ${info.messageId}`);
              res.json({message: sendUser.message});
            })
      } else {
        let sendUser = {
          email: result.dataValues.vendorEmail,
          password: result.dataValues.vendorpwd,
          subject: `Regarding Equimax Account Approval`,
          message: `Opps!!! Your registration has not accepted.`
        }
        sendMail(sendUser, info => {
          console.log(`The mail has been send 😃 and the id is ${info.messageId}`);
          res.json({message: sendUser.message});
        })
      }
    }).catch(err1 => {
      res.status(400).send(err1);
    })
  }).catch(err => {
    res.status(400).send('No entry found');
  })
})

router.get('/getsuppbyid', (req, res) => {
  Datavendor.findOne({
    where: {
      venVendorPK: req.query.id
    }
  }).then(result => {
    Datavendorinfo.findOne({
      where: {
        venVendorFK: result.venVendorPK
      }
    }).then(data => {
      if(data) {
        let response = {
         ...result.dataValues,
         ...data.dataValues
        }
        res.send(response);
      } else {
        res.status(404).send('Entry does not found');
      }
    }).catch(err1 => {
      res.status(400).send(err1);
    })
  }).catch(err => {
    res.status(400).send(err);
  })
})

router.get('/getCategories' , (req, res) => {
  Datavendorinfo.findOne({
    where: {
      venVendorFK: req.query.id
    }
  }).then(response => {
    supplierCategory.findAll({
      where: {
        suppRegNo: response.vendorPK
      }
    }).then(data => {
      res.send(data);
    }).catch(err => {
      res.status(400).send(err);
    })
  }).catch(err3 => {
    res.status(400).send(err3);
  })
})

router.put('/updateView', (req, res) => {
  let response = {
    result: '',
    status: 200
  };
  console.log(req.body);
  for (let i of req.body.id) {
    Datavendorinfo.update(
      {
        venisViewed: req.body.isviewed,
      },
      {
        returning: true,
        where: {
          venVendorFK: i
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
  Datavendorinfo.findAndCountAll({
    where: {
      venisapproved: 'Pending',
      venisViewed: false
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
  
  Datavendorinfo.findAndCountAll({
    where: {
      venisapproved: 'Pending',
    },
    order: [
      ['venVendorFK', 'DESC'],
    ],
  }).then(data => {
    console.log(data.rows);
    let ids = [];
    for (let i of data.rows) {
      ids.push(i.venVendorFK);
    }
    console.log('ID',ids);
    Datavendor.findAndCountAll({
      where: {
        venVendorPK: {
          [Op.in] : ids
        }
      }
    }).then(response => {
      if(data.count !== 0) {
        let result = [];
        console.log(response.rows);
        for (let i = 0; i < data.rows.length ; i++) {
           result.push({
             ...data.rows[i].dataValues,
             ...response.rows[i].dataValues
           })
        }
        let output = {
          count: data.count,
          rows: result
        }
        res.send(output);
    } else {
      res.send({count: 0});
    }
    })
  }).catch( err => {
    res.send(err);
  })
})

router.post('/resendEmail', (req, res) => {
  var origin = req.get('origin');
  Datavendorinfo.findOne({
    where: {
      vendorEmail: req.body.email
    }
  }).then(result => {
    Datavendorinfo.update({
      ventoken: ''
    }, {
      returning: true,
      where: {
        venVendorFK: result.venVendorFK
      }
    }).then(data => {
      if (result.venisVerified === false) {
        Datavendorinfo.findOne({
          where: {
            vendorEmail: req.body.email
          }
        }).then(info => {
          let token = jwt.sign(info.dataValues, process.env.SECRET_KEY,{expiresIn: "1h"})
          const verifyUrl = `${origin}/verify-email?token=${token}`;
          let sendUser = {
            email: result.vendorEmail,
            subject: `Sign-up Verification API - Verify ResendEmail`,
            message: `<p>Please click the below link to verify your email address:</p>
            <a href="${verifyUrl}"><button style="background-color: orange">Verify your Email</button></a>`
          }
          Datavendorinfo.update({
            ventoken: token
          }, {
            returning: true,
            where: {
              venVendorFK: result.venVendorFK
            }
          }).then(done => {
            console.log(done);
            sendMail(sendUser, info => {
              console.log(`The mail has been send 😃 and the id is ${info.messageId}`);
              res.send({
                message: "The mail has been send, Please check your email"
              });
            })
          })
        })
      } else {
        res.send({
          message: "Your email is already verified"
        })
      }
    })
  })
})


module.exports = router
