const sql = require('../database/db_connect');
const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

// Fetch Order with status

router.get('/allOrders', (req,res) => {
    sql.query(`select o.*, s.status,s.message,s.color, sum(l.total_price) as total_price from orders o, \ 
    locations l, order_status s where o.order_id = s.order_id and o.order_id = l.order_id group by \
     o.order_id`, (err,response) => {
       if(err) {
           res.send(err);
       } else {
           res.send(response);
       }
    });
})

// update the color

router.post('/updateColor', (req,res) => {
    const order_id = req.body.order_id;
    const color = req.body.color;
    sql.query(`update order_status set color = "${color}" where order_id = ${order_id}`, (err,response) => {
       if(err) {
           res.send(err);
       } else {
           res.send(response);
       }
    });
})

// Order by status

router.get('/Order_by_status', (req,res) => {
    const status = req.query.status
    sql.query(`SELECT o.* , s.status ,  s.message, sum(l.total_price) as total_price from orders o, order_status s, locations l \ 
    where s.status = "${status}" AND o.order_id = s.order_id AND o.order_id = l.order_id group by o.order_id`, (err, response) => {
        if (err) {
            res.send(err);
        } else {
            res.send(response);
        }
    })
})

// Item by status

router.get('/Item_by_status', (req,res) => {
    const status = req.query.status
    sql.query(`SELECT * from order_items where status = "${status}"`, (err, response) => {
        if (err) {
            res.send(err);
        } else {
            res.send(response);
        }
    })
})

// Track Items

router.get('/trackItems', (req,res) => {
    const order_id = req.query.order_id;
    sql.query(`SELECT * FROM order_items where order_id = ${order_id} AND status 
    NOT LIKE "Pending" AND status NOT LIKE "Approved" AND status NOT LIKE "Cancelled"`, (err, response) => {
        if (err) {
            res.send(err);
        } else {
            res.send(response);
        }
    })
})

// Count Order with respect to Status

router.get('/countStatusOrder', (req,res) => {
    const status = req.query.status;
    sql.query(`SELECT count(*) as total from orders o, order_status s 
    where s.status = "${status}" AND o.order_id = s.order_id`, (err, response) =>{
        if(err) {
            res.send(err)
        } else {
            const order = JSON.parse(JSON.stringify(response));
            let result = { 
                data : order[0].total,
                status: 200,
                message: 'Success'
            }
            res.send(result);
        }
    })
})

// update the status of Order

router.put('/updateStatus', (req,res) => {
    const status = req.body.status;
    const order_id = req.body.order_id;
    const message = req.body.message;
    sql.query(`update  order_status set status = "${status}", message = "${message}" \ 
    where order_id = ${order_id}`, (err, response) => {
        if(!err) {
            sql.query(`update  order_items set status = "${status}" \ 
            where order_id = ${order_id}`, (err, response) => {
                if(err) {
                    res.send(err);
                } else {
                    res.send(response);
                }
            })
        } else {
            res.send(err);
        }
    })
})

module.exports = router;