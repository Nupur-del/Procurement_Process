const sql = require('../database/db_connect');
const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

// Fetch PO by Status

router.get('/po_by_status', (req,res) => {
    const status = req.query.status;
    sql.query(`SELECT p.* , s.status \
    from pos p, po_status s where s.status = "${status}" AND p.billNo = s.billNo`, (err,response) => {
       if(err) {
           res.send(err);
       } else {
           res.send(response);
       }
    });
})

// Fetch In Progress PO

router.get('/inProgress_PO', (req,res) => {
    sql.query(`SELECT p.* , s.status \
    from pos p, po_status s where s.status Not in ("Item Delivered", "Pending")\
    AND p.billNo = s.billNo`, (err,response) => {
       if(err) {
           res.send(err);
       } else {
           res.send(response);
       }
    });
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
    const order_id = req.body.order_id;
    const status = req.body.status;
    const message = req.body.message;
    const item_id = req.body.item_id;
    sql.query(`UPDATE order_status set status = "${status}", message = "${message}" \
    WHERE order_id = ${order_id}`, (err, response) => {
        if(!err) {
                    sql.query(`UPDATE order_items SET status = "${status}" \
                    WHERE id = ${item_id}`, (err, response) => {})
            res.send(response);
        } else {
            res.send(err);
        }
    })
})

// Po count as by status

router.get('/countPo_by_status', (req,res) => {
    const status = req.query.status;
    sql.query(`SELECT count(*) as total from pos p, po_status s 
    where s.status = "${status}" AND p.billNo = s.billNo`, (err, response) => {
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
})

// Fetch inProgress POs

router.get('/InProgressPo_count', (req,res) => {
    const status = req.query.status;
    sql.query(`SELECT count(*) as total from pos p, po_status s 
    where s.status Not in ("Item Delivered", "Pending") AND p.billNo = s.billNo`, (err, response) => {
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
})

// Update status of PO

router.post('/update_po_status', (req, res) => {
    const order_id = req.body.order_id;
    const status = req.body.status;
    const billNo = req.body.billNo;
    const message = req.body.message;
    const item_id = req.body.item_id;
    sql.query(`UPDATE order_status set status = "${status}", message = "${message}" \
    WHERE order_id = ${order_id}`, (err, response) => {
        if(!err) {
                    sql.query(`UPDATE order_items SET status = "${status}" \
                    WHERE id = ${item_id}`, (err, response) => {
                        if(!err) {
                            sql.query(`UPDATE po_status SET status = "${status}" \
                    WHERE billNo = ${billNo}`, (err, response) => {
                        if(!err) {
                            sql.query(`UPDATE pos SET po_status = "${status}" \
                    WHERE billNo = ${billNo}`, (err, response) => {
                        if(err) {
                            res.send(err);
                        }
                    })
                        }
                    });
                        }
                    });
            res.send(response);
        } else {
            res.send(err);
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
    const billNo = req.body.billNo;

    sql.query(`UPDATE order_items SET status = "${order_status}" ,tracking_link = "${tracking_link}", \
    estimated_arrival = ${estimated_arrival} WHERE id = ${item_id}`, (err, response) => {
        if(!err) {
            sql.query(`UPDATE order_status SET status = "${order_status}", message = "${order_msg}" \ 
            WHERE order_id = ${order_id}`, (err, response) => {
                if(!err) {
                   sql.query(`UPDATE pos SET po_status = "${order_status}" , \
                   tracking_link = "${tracking_link}", \
                   estimated_arrival = ${estimated_arrival} , message_client = "${order_msg}" \
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