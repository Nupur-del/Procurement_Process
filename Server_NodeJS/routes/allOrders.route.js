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

// Fetching total budget location wise

router.get('/fetchBudget', (req,res) => {
    const loc = req.query.location;
    sql.query(`select sum(current_balance) as budget, location from budgets where location = "${loc}"`, (err,response) => {
       if(err) {
           res.send(err);
       } else {
           res.send(response);
       }
    });
})

// Fetch spent location and department wise

router.get('/spentLocDeptWise', (req,res) => {

    var startYear = "";
    var endYear = "";
    var today = new Date();
    
    if ((today.getMonth() + 1) <= 3) {
      startYear = (today.getFullYear() - 1);
      endYear = today.getFullYear()
    } else {
        startYear = today.getFullYear();
        endYear = (today.getFullYear() + 1);
    }

    const startDate = startYear + "-3-1";
    const endDate = endYear + "-3-31";
    console.log('End', endDate);
    console.log('Start', startDate);
    const loc = req.query.location;
    const dept = req.query.department;
    sql.query(`select sum(l.total_price) as total_spent,l.location, l.department from orders o,locations l \
     where o.order_id = l.order_id and o.date between "${startDate}"  and "${endDate}" \
      and l.location = "${loc}"  and l.department = "${dept}"`, (err, response) => {
        if (err) {
            res.send(err);
        } else {
            res.send(response);
        }
    })
})



// distinct location by order_id

router.get('/distinctLocation', (req,res) => {
    const order_id = req.query.order_id;
    sql.query(`select distinct(location) from locations where order_id = ${order_id}`, (err,response) => {
       if(err) {
           res.send(err);
       } else {
           res.send(response);
       }
    });
})

// Fetching total Spent

router.get('/spentYearWise', (req,res) => {

    var startYear = "";
    var endYear = "";
    var today = new Date();
    
    if ((today.getMonth() + 1) <= 3) {
      startYear = (today.getFullYear() - 1);
      endYear = today.getFullYear()
    } else {
        startYear = today.getFullYear();
        endYear = (today.getFullYear() + 1);
    }

    const startDate = startYear + "-3-1";
    const endDate = endYear + "-3-31";
    console.log('End', endDate);
    console.log('Start', startDate);
    const loc = req.query.location;
    sql.query(`select sum(l.total_price) as total_spent,l.location from orders o,locations l \
     where o.order_id = l.order_id and o.date between "${startDate}"  and "${endDate}" and l.location = "${loc}"`, (err, response) => {
        if (err) {
            res.send(err);
        } else {
            res.send(response);
        }
    })
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