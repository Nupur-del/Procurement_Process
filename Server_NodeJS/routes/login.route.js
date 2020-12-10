const express = require('express');
const router = express.Router();
const cors = require('cors');

const User = require('../models/dataadmin.model');
const adminaccess = require('../models/adminaccess.model');
const admintype = require('../models/admintype.model');

router.use(cors());
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  next();
});

// Login
router.post('/login', (req,res)=>  {
  console.log(req.body);
  User.findOne({
    where: {
      admEmail: req.body.email
    }
  })
  .then(user => {
    let response = {
        data: user,
        status: 200,
        statusCode:1,
        message:'Success'
    };
    console.log('user = ', user);
    if (user) {
      if( req.body.password === response.data.admpwd ) {
        adminaccess.findOne({
          where: {
            adminid: response.data.admAdminPK
          }
        }).then(found => {
          console.log(found);
          if (found) {
            admintype.findOne({
              where: {
                admintypeid: found.admintype
              }
            }).then(userDetails => {
              if (userDetails) {
                if (req.body.user_type === userDetails.admintype) {
                  if (user.admIsActive === true) {
                    res.json({
                      type: userDetails.admintype,
                      name: response.data.admName,
                      id: found.adminid
                    });
                  } else {
                    res.status(400).send({
                      message: "User is not active"
                    });
                  }
                } else {
                  res.status(400).send({
                    message: "Invalid user type"
                  });
                }
              } else {
                res.status(404).send({
                  message: "User does not exist"
                });
              }
            }).catch(err => {
              res.send(err);
            })
          } else {
            res.status(400).send({
              message: "Invalid user"
            })
          }
        }).catch(error => {
          res.send(error);
        })
      } else {
        response.data = null;
        response.status= 404;
        response.statusCode = 0;
        response.message = "Invalid Password";
        res.status(404).send(response);
      }
    } else {
      return res.status(404).send({ message: 'User does not exist'});
    }
  }).catch(err => {
    console.log('err = ',err);
    res.status(500).send({
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

router.get('/getUser', (req,res) => {
  let dataadminDetails = [];
  User.findAll().then(data => {
     dataadminDetails = data;
  }).catch(err => {
    console.log(err);
  })

  admintype.findOne({
    where: {
      admintype: req.query.type
    }
  }).then(usertype => {
    adminaccess.findAll({
      where: {
        admintype: usertype.admintypeid
      }
    }).then(users => {
      let result = [];
      for (let i of users) {
        result.push({
          name: dataadminDetails.find(e => e.admAdminPK === i.adminid).admName,
          id: dataadminDetails.find(a => a.admAdminPK === i.adminid).admAdminPK
        })
      }
      res.send(result);
      console.log(result);
    }).catch(err => {
      res.send(err);
    })
  }).catch(err => {
    res.send(err);
   })
 })

module.exports = router
