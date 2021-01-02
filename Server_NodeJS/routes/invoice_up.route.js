const sql = require('../database/db_connect');
const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

router.get('/invoice_by_billNo', (req,res) => {

    const billNo = req.query.billNo;
    
    sql.query(` select i.* , t.invoiced_quantity, t.market_price, o.created_by, s.* from \
    invoices i,invoice_item t, orders o, order_items s where i.invoice_no = t.invoice_no and \
    i.billNo = ${billNo} and t.item_id = s.id and s.order_id = o.order_id;`, (err, response) => {
        if(err) {
            res.send(err);
        } else {
            res.send(response);
        }
    });
})

module.exports = router;