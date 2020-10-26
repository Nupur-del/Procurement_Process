const express = require('express');
const router = express.Router();
const cors = require('cors');

const Order = require('../models/order.model');
const Location = require('../models/location.model');
const Order_status = require('../models/order_status.model');
const Order_items = require('../models/order_item.model');

router.use(cors()); 

// Add Order
router.post('/order', (req,res) => {

  const today = new Date();
  const orderData = {
    created_by : req.body.created_by,
    date: today,
    order_desc: req.body.order_desc,
    order_id: req.body.order_id
  }

  const orderStatus = {
   order_id: req.body.order_id,
   status: req.body.status,
   message: req.body.message
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
        let locationData;
        for(let i of req.body.multiLocs) {
        locationData = {
          order_id: req.body.order_id,
          ...i
        }
        Location.create(locationData)
        .then(loc => {
          response.data = loc;
          response.status= 200;
          response.statusCode = 1;
        }).catch(err => {
          res.send(err);
         })
       }
         let orderItemData;
         for (let i of req.body.finalItem) {
          orderItemData = {
            order_id: req.body.order_id,
             ...i,
            status: req.body.status
           }
          Order_items.create(orderItemData)
          .then(order_item => {
            response.data = order_item;
            response.status= 200;
            response.statusCode = 1;
          }).catch(err => {
            res.send(err);
          })
        }
            Order_status.create(orderStatus)
            .then(order_status => {
              response.data = order_status;
              response.status= 200;
              response.statusCode = 1;
              response.message = 'Order submitted Successfully'
              res.send({
                  status: response.status,    
                  message: response.message
               })
            })
            .catch(error => {
              res.json({
                message: error.message,
                order_id: req.body.order_id
              });
            })
       })
      .catch(error => {
        res.json({
          message: error.message,
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

// Fetch all the Locations

router.get('/locations', (req,res) => {
  Location.findAll()
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
  Order.findAll({
    where: {
      order_id: req.query.order_id
    }
  })
  .then(order => {
    res.send(order);
  })
  .catch(error => {
    res.send(error.message);
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

router.get('/Item_by_order_id', (req,res) => {
  Order_items.findAll({
    where: {
      order_id: req.query.order_id
    }
  })
  .then(item => {
    res.send(item);
  })
  .catch(error => {
    res.send(error.message);
  })
})

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
              Order.destroy({
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
  Order.findAndCountAll().then(response => {
    res.send(response);
  }).catch(err => {
    res.send({message: err.message})
  })
})

router.get('/',(req,res) => {
  res.send('From API Server');
})

module.exports = router
