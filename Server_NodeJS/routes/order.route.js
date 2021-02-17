const express = require('express');
const router = express.Router();
const cors = require('cors');

const Order = require('../models/order.model');
const Order_status = require('../models/order_status.model');
const Order_items = require('../models/order_item.model');
const locations = require('../models/datalocation.model');
const admin = require('../models/dataadmin.model');

router.use(cors()); 

// Add Order

router.post('/order', (req,res) => {
  const today = new Date();
  const orderData = {
    created_by : req.body.creator,
    date: today,
    order_desc: req.body.order_desc,
    order_id: req.body.order_id,
    message: req.body.message,
    status: 1
  } 
  Order.findOne({
    where: {
      order_id: req.body.order_id
    }
  }).then(order => {
    let response = {
        data: order,
        status: 409,
        statusCode:1,
        message:'Order with given Id already exists'
    };
    console.log('order = ', response.data);
    if(!order || order.length === 0){
        response.data = null;
        response.status= 404;
        response.statusCode = 0;
        Order.create(orderData)
       .then(order => {
        response.data = order;
        response.status= 200;
        response.statusCode = 1;
         let orderItemData;
         for (let i of req.body.finalItem) {
          orderItemData = {
            order_id: req.body.order_id,
             ...i,
            status: 1
           }
          Order_items.create(orderItemData)
          .then(order_item => {
            response.data = order_item;
            response.status= 200;
            response.statusCode = 1;
            response.message = 'Order submitted successfully'
            res.send(response);
          }).catch(err => {
            res.send(err);
           })
         }
       })
      .catch(error => {
        res.json({
          message: error,
          order_id: req.body.order_id
        });
      })
    } else {
      res.json({error: response.message})
    }
  }).catch(error => {
    res.send('error'+ error)
  })
})

// Fetch all the Items

router.get('/items', (req,res) => {
  Order_items.findAll()
  .then(items => {
    let response = {
      data: items,
      status: 200,
      statusCode: 0,
      message: 'Success'
    }
    res.send(response);
  })
  .catch(error => {
    res.send(error.message);
  })
})

router.get('/getStatus', (req,res) => {
  Order_status.findAll().then(result => {
    res.send(result);
  }).catch(err => {
    res.status(500).send(err);
  })
})

// Fetch all the Locations

router.get('/locations', (req,res) => {
  locations.findAll()
  .then(locs => {
    let response = {
      data: locs,
      status: 200,
      statusCode: 0,
      message: 'Success'
    }
    res.send(response);
  })
  .catch(error => {
    res.send(error.message);
  })
})

// Fetch location by order id

router.get('/location_by_order_id', (req,res) => {
  Location.findAll({
    where: {
      order_id: req.query.order_id
    }
  })
  .then(locs => {
    res.send(locs);
  })
  .catch(error => {
    res.send(error.message);
  })
})

// Fetch Order by order id

router.get('/Order_by_order_id', (req,res) => {
  Order.findOne({
    where: {
      order_id: req.query.order_id
    }
  })
  .then(order => {
    admin.findOne({
      where: {
        admAdminPK: order.created_by
      }
    }).then(info => {
      let result = {
        ...order.dataValues,
        creator: info.admName
      }
      res.send(result);
    }).catch(err => {
      res.status(400).send(err);
    })
  })
  .catch(error => {
    res.status(400).send(error.message);
  })
})

// Fetch Status by Order id

router.get('/Status_by_order_id', (req,res) => {
  Order_status.findOne({
    where: {
      order_id: req.query.order_id
    }
  })
  .then(status => {
    res.send(status);
  })
  .catch(error => {
    res.send(error.message);
  })
})

// Fetch Item by order id

// router.get('/Item_by_order_id', (req,res) => {
//   Order_items.findAll({
//     where: {
//       order_id: req.query.order_id
//     }
//   })
//   .then(item => {
//     locations.findAll({})
//     res.send(item);
//   })
//   .catch(error => {
//     res.send(error.message);
//   })
// })

// Fetch item by item id

router.get('/Item_by_item_id', (req,res) => {
  Order_items.findAll({
    where: {
      id: req.query.id
    }
  })
  .then(item => {
    res.send(item);
  })
  .catch(error => {
    res.send(error.message);
  })
})

// Delete Order

router.delete('/removeOrder', (req,res) => {
  Order.findOne({
    where: {
      order_id: req.query.order_id
    }
}).then(order => {
  if(order) {
          Order_items.destroy({
            where: {
                order_id: order.order_id
            }
          }).then(result => {
              Order.destroy({
                where: {
                    order_id: order.order_id
                }
              }).then(exist => {
                  let response = {
                    data: exist,
                    status: 200,
                    message: 'Order deleted Successfully'
                  }
                  res.send(response)
              }).catch(err => { res.send(err) })
          }).catch(err => { res.send(err) })
   }
 }).catch(err => { res.json({message: 'Order with provided order id does not exist'}) })
})

// Only delete the order from order_status, order_items and locations

router.delete('/orderDeletion', (req,res) => {
  Order.findOne({
    where: {
      order_id: req.query.order_id
    }
}).then(order => {
  if(order) {
    Order_status.destroy({
      where: {
        order_id: order.order_id
      }
    }).then(result => {
      Location.destroy({
         where: {
           order_id: order.order_id
          }
      }).then(result => {
          Order_items.destroy({
            where: {
                order_id: order.order_id
            }
          }).then(result => {
                  let response = {
                    data: result,
                    status: 200,
                    message: 'Order deleted Successfully'
                  }
                  res.send(response)
          }).catch(err => { res.send(err) })
      }).catch(err => { res.send(err) })     
    }).catch(err => { res.send(err) })
   }
 }).catch(err => { res.json({message: 'Order with provided order id does not exist'}) })
})

// Fetch Orders and count

router.get('/countOrder', (req,res) => {
  Order.findAndCountAll({
    where: {
      created_by: req.query.userID
    }
  }).then(response => {
    console.log(response.count);
    console.log(response['count']);
    res.json(''+ response.count);
  }).catch(err => {
    res.send({message: err.message})
  })
})

router.get('/countOrderApprover', (req,res) => {
  Order.findAndCountAll({
    where: {
      approved_by: req.query.userID
    }
  }).then(response => {
    console.log(response.count);
    console.log(response['count']);
    res.json(''+ response.count);
  }).catch(err => {
    res.send({message: err.message})
  })
})

router.get('/',(req,res) => {
  res.send('From API Server');
})

module.exports = router
