const sql = require('../database/db_connect');
const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

// Fetch PO by Status

router.get('/po_by_status', (req,res) => {
    const status = req.query.status;
    const user = req.query.user;
    const type = req.query.type;
    if (type === 'Supplier') {
        sql.query(`select distinct(s.created_by), p.* from pos p, po_items i, \
        orders s where i.order_id = s.order_id and p.po_status = ${status} and \
        p.billNo = i.billNo and p.supplier = ${user}`, (err,response) => {
            if(err) {
                res.send(err);
            } else {
                res.send(response);
            }
         });
    } else {
        sql.query(`select distinct(s.created_by), p.* from pos p, po_items i, \
        orders s where i.order_id = s.order_id and p.po_status = ${status} and \
        p.billNo = i.billNo and s.created_by = ${user}`, 
        (err,response) => {
            if(err) {
                res.send(err);
            } else {
                res.send(response);
            }
         });
    }
})

// Fetch In Progress PO

router.get('/inProgress_PO', (req,res) => {
    const user = req.query.user;
    const type = req.query.type;
    if (type === 'Supplier') {
        sql.query(`select distinct(s.created_by), p.* from pos p, po_items i, \
        orders s where i.order_id = s.order_id and p.po_status not in (1,7,6) and \
        p.billNo = i.billNo and p.supplier = ${user}`, (err,response) => {
            if(err) {
                res.send(err);
            } else {
                res.send(response);
            }
         });
    } else {
        sql.query(`select distinct(s.created_by), p.* from pos p, po_items i, \
        orders s where i.order_id = s.order_id and p.po_status not in (1,7,6) and \
        p.billNo = i.billNo and s.created_by = ${user}`, 
        (err,response) => {
            if(err) {
                res.send(err);
            } else {
                res.send(response);
            }
         });
    }
})

// Update invoice status in PO

router.post('/update_invoice_status', (req,res) => {
    const invoice_status = req.body.invoice_status;
    const billNo = req.body.billNo;
    sql.query(`UPDATE pos set invoice_status = "${invoice_status}" where billNo = ${billNo}`, (err, response) => {
        if(err) {
            res.send(err);
        } else {
            res.send(response);
        }
    });
})

// Order status and update order_item

router.post('/update_status', (req, res) => {
    // const order_id = req.body.order_id;
    const status = req.body.status;
    let result;
    // const message = req.body.message;
    // const item_id = req.body.item_id;
    // sql.query(`UPDATE order_status set status = "${status}", message = "${message}" \
    // WHERE order_id = ${order_id}`, (err, response) => {
    //     if(!err) {
        for (let i of req.body.item) {
            sql.query(`UPDATE order_items SET status = "${status}" \
            WHERE id = ${i.item_id} and order_id = ${i.order_id}`, (err, response) => {
              if(!err) {
                  result = response;
              } else {
                  result = err;
              } 
            })
        }
        res.send(result);
            // res.send(response);
        // } else {
        //     res.send(err);
        // }
    // })
})

// Po count as by status

router.get('/countPo_by_status', (req,res) => {
    const status = req.query.status;
    const user = req.query.user;
    const type = req.query.type;
    if (type === 'Supplier') {
        sql.query(`SELECT count(*) as total from pos where po_status = "${status}" and supplier = ${user}`, (err, response) => {
            if(err) {
                res.send(err);
            } else {
                const PO = JSON.parse(JSON.stringify(response));
                let result = { 
                    data : PO[0].total,
                    status: 200,
                    message: 'Success'
                }
                res.send(result);
            }
        });
    } else {
        sql.query(`select count(*) as total from pos where billNo in (select p.billNo from pos p, po_items i,orders s where i.order_id = s.order_id and 
            p.po_status = ${status} and p.billNo = i.billNo and s.created_by = ${user})`, (err, response) => {
            if(err) {
                res.send(err);
            } else {
                const PO = JSON.parse(JSON.stringify(response));
                let result = { 
                    data : PO[0].total,
                    status: 200,
                    message: 'Success'
                }
                res.send(result);
            }
        });
    }
    
})

// Fetch inProgress POs

router.get('/InProgressPo_count', (req,res) => {
     const user = req.query.user;
     const type = req.query.type;
     if ( type === 'Supplier') {
        sql.query(`SELECT count(*) as total from pos where po_status not in (1,7,6) \
        and supplier = ${user}`,
         (err, response) => {
            if(err) {
                res.send(err);
            } else {
                const PO = JSON.parse(JSON.stringify(response));
                let result = { 
                    data : PO[0].total,
                    status: 200,
                    message: 'Success'
                }
                res.send(result);
            }
        })
     } else {
        sql.query(`select count(*) as total from pos where billNo in (select p.billNo from pos p, po_items i,orders s where i.order_id = s.order_id and 
            p.po_status not in (1, 7,6) and p.billNo = i.billNo and s.created_by = ${user})`,
         (err, response) => {
            if(err) {
                res.send(err);
            } else {
                const PO = JSON.parse(JSON.stringify(response));
                let result = { 
                    data : PO[0].total,
                    status: 200,
                    message: 'Success'
                }
                res.send(result);
            }
        });
     }
})

router.put('/updateItem_Status', (req, res) => {
    console.log(req.body);
    let result;
    for (let i of req.body) {
        sql.query(`UPDATE order_items set status = "${i.status}" \
        WHERE id = ${i.id}`, (err, response) => {
          if (err) {
              result = err;
          } else {
              result = response;
          }
        });
    }
    res.send(result);
})

router.get('/po_by_billNo', (req, res) => {
    const bill = req.query.billNo;
    sql.query(`select p.*, s.created_by, i.* , p.comment as commentSupplier from pos p, orders s, order_items i, \
    po_items t where p.billNo = t.billNo and s.order_id = t.order_id and i.id = t.item_id \
    and p.billNo = ${bill};`, (err,response) => {
        if(err) {
            res.send(err);
        } else {
            res.send(response);
        }
    })
})

// Track PO

router.put('/trackPO', (req,res) => {

    const order_status = req.body.order_status;
    const item_id = req.body.item_id;
    const order_msg = req.body.order_msg;
    const order_id = req.body.order_id;
    const tracking_link = req.body.tracking_link;
    const estimated_arrival = req.body.estimated_arrival;
    console.log(estimated_arrival);
    const billNo = req.body.billNo;

    sql.query(`UPDATE order_items SET status = "${order_status}" ,tracking_link = "${tracking_link}", \
    estimated_arrival = "${estimated_arrival}" WHERE id = ${item_id}`, (err, response) => {
        if(!err) {
            sql.query(`UPDATE order_status SET status = "${order_status}", message = "${order_msg}" \ 
            WHERE order_id = ${order_id}`, (err, response) => {
                if(!err) {
                   sql.query(`UPDATE pos SET po_status = "${order_status}" , \
                   tracking_link = "${tracking_link}", \
                   estimated_arrival = "${estimated_arrival}" , message_client = "${order_msg}" \
                   WHERE billNo = ${billNo}`, (err, response) => {
                       if(!err) {
                        sql.query(`UPDATE po_status SET status = "${order_status}" \
                        WHERE billNo = ${billNo}`, (err, response) => {
                          if(!err) {
                            res.send(response);
                          }
                        })  
                       }
                   });
                }
            });
        }
        else {res.send(err)}
    })
})

// Fetch attachment by billNo

router.get('/attachments_by_billNo', (req,res) => {
    const billNo = req.query.billNo;
    sql.query(`SELECT attachments FROM po_attachments where billNo = ${billNo}`, (err,response) => {
        if(err) {
            res.send(err);
        } else {
            res.send(response);
        }
    })
})

module.exports = router;