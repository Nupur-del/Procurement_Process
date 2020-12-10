const sql = require('../database/db_connect');
const express = require('express');
const router = express.Router();
const cors = require('cors');
const { response } = require('express');

router.use(cors());

// Fetch Order with status

router.get('/allOrders', (req, res) => {
    const requestor = req.query.userID;
    sql.query(`select o.order_id, a.admName as created_by, o.date, o.order_desc,o.message,\
    s.orderStatus as status, sum(i.price*i.quantity) as total_price from orders o, 
        orderstatus s, order_items i, dataadmin a where o.order_id = i.order_id and \
        o.status = s.id  and o.created_by = a.admAdminPK and o.created_by = ${requestor}
        group by o.order_id order by o.date desc`, (err,response) => {
       if(err) {
           res.send(err);
       } else {
           res.send(response);
       }
    });
})

router.get('/allOrdersApprover', (req, res) => {
    const approver = req.query.userID;
    sql.query(`  select o.order_id, a.admName as created_by, o.date, o.order_desc, o.message, if(o.approved_by is NULL, "Not Assigned", b.admName) as approved_by,\
    s.orderStatus as status, sum(i.price*i.quantity) as total_price from orders o, 
        orderstatus s, order_items i, dataadmin a, dataadmin b where o.order_id = i.order_id and \
        o.status = s.id  and o.created_by = a.admAdminPK and (o.approved_by is NULL or \
        o.approved_by = ${approver}) and b.admAdminPK = o.approved_by group by o.order_id order by o.date desc;`, (err,response) => {
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

// Fetch the remaining budget location and department wise

router.get('/totalCost', (req,res) => {
    const order_id = req.query.order_id;
    sql.query(`select 
    o.order_id,  
    o.date, 
    o.order_desc,
    o.message, 
    s.orderStatus as status, 
    a.admName as created_by,
    l.locName as location, 
    d.department_name as department, 
    sum(i.price * i.quantity) as total_price 
    from 
    orders o, 
    orderstatus s, 
    order_items i, 
    dataadmin a, 
    datalocation l, 
    departments d 
    where 
    o.order_id = ${order_id} and 
    l.locLocationPK = i.location and 
    i.department = d.id and 
    o.order_id = i.order_id and 
    o.status = s.id and 
    o.created_by = a.admAdminPK 
    group by i.location, i.department`, (err, response) => {
        if(err) {
            res.send(err);
        } else {
            res.send(response);
        }
    })
})

router.get('/remainBudgetLocDeptWise', (req,res) => {

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
    sql.query(`select sum(l.total_price) as total_spent,l.location, l.department,  b.current_balance, b.budget from orders o,locations l, budgets b \
     where o.order_id = l.order_id and o.date between "${startDate}"  and "${endDate}" \
      and l.location = "${loc}"  and l.department = "${dept}" and l.location = b.location and l.department = b.department`, (err, response) => {
        if (err) {
            res.send(err);
        } else {
            res.send(response);
        }
    })
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
    sql.query(`select sum(l.total_price) as total_spent,l.location, l.department, s.status \ 
    from orders o,locations l, order_status s \
     where o.order_id = l.order_id and o.order_id = s.order_id and o.date between "${startDate}"  and "${endDate}" \
      and l.location = "${loc}"  and l.department = "${dept}" and s.status != "Denied"`, (err, response) => {
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

// distinct combination of location and department

router.get('/uniqueLocDept', (req,res) => {
    sql.query(`select distinct(location), department from locations`, (err,response) => {
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

    const startDate = startYear + "-4-1";
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
    const status = req.query.status;
    const userID = req.query.userID;
    if (status === 'Pending') {
    sql.query(`select o.order_id, a.admName as created_by, o.date, o.order_desc,o.message, \
    s.orderStatus as status, sum(i.price*i.quantity) as total_price from orders o, \
    orderstatus s, order_items i, dataadmin a where o.order_id = i.order_id and \
    s.orderStatus = '${status}' and o.status = s.id and o.created_by = ${userID} and \
    o.created_by = a.admAdminPK group by o.order_id order by o.date desc`, (err, response) => {
        if (err) {
            res.send(err);
        } else {
            res.send(response);
        }
    })
   } else {
    sql.query(`select o.order_id, a.admName as created_by, o.date, b.admName as approved_by, \
    o.order_desc,o.message, s.orderStatus as status, sum(i.price*i.quantity) as total_price from \
    orders o, orderstatus s, order_items i, dataadmin a, dataadmin b where o.order_id = i.order_id \
    and s.orderStatus = '${status}' and o.status = s.id and o.created_by = ${userID} and \
    b.admAdminPK = o.approved_by and o.created_by = a.admAdminPK group by o.order_id \
    order by o.date desc`, (err, response) => {
        if (err) {
            res.send(err);
        } else {
            res.send(response);
        }
    })
   }
})

router.get('/Order_by_statusApprover', (req,res) => {
    const status = req.query.status;
    const userID = req.query.userID;
    if (status === 'Pending') {
        sql.query(`select o.order_id, a.admName as created_by, o.date, o.order_desc,o.message, \
        s.orderStatus as status, sum(i.price*i.quantity) as total_price from orders o, \
        orderstatus s, order_items i, dataadmin a where o.order_id = i.order_id and \
        s.orderStatus = '${status}' and o.status = s.id and \
        o.created_by = a.admAdminPK group by o.order_id order by o.date desc`, (err, response) => {
            if (err) {
                res.send(err);
            } else {
                res.send(response);
            }
        })
    } else {
        sql.query(`select o.order_id, a.admName as created_by, b.admName as approved_by, o.date, o.order_desc,o.message, \
        s.orderStatus as status, sum(i.price*i.quantity) as total_price from orders o, \
        orderstatus s, order_items i, dataadmin a, dataadmin b where o.order_id = i.order_id \
        and b.admAdminPK = o.approved_by and s.orderStatus = '${status}' and o.status = s.id \
        and (o.approved_by is NULL or o.approved_by = ${userID}) and \
        o.created_by = a.admAdminPK group by o.order_id order by o.date desc`, (err, response) => {
            if (err) {
                res.send(err);
            } else {
                res.send(response);
            }
        })
    }
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
    sql.query(` SELECT count(*) as total from orders o, orderstatus s 
    where s.orderStatus = '${status}' AND s.id = o.status;`, (err, response) =>{
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

router.put('/partialUpdate', (req, res) => {
    let error = '';
    let result = '';
       sql.query(`update orders set status = ${req.body[0].orderStatus}, approved_by = ${req.body[0].approved_by}, \
       message = '${req.body[0].message}' where order_id = ${req.body[0].order_id}`, (err, response) => {
           if(!err) {
    for (let i of req.body) {
               sql.query(`update order_items set status = ${i.itemStatus} \
               where location = ${i.location} and department = ${i.department} and order_id = ${i.order_id}`, (err1, response1) => {
              });
           }
           res.send(response);
       } else {
           res.send(err);
       }
   });
})

router.put('/updateStatus', (req,res) => {
    const status = req.body.status;
    const order_id = req.body.order_id;
    const message = req.body.message;
    const approved_by = req.body.approver;
    sql.query(`update  orders set status = ${status}, message = "${message}", approved_by = ${approved_by} \ 
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