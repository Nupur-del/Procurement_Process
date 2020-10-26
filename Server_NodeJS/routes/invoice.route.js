const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

const Invoice = require('../models/invoice.model');

// Create Invoice

router.post('/invoice', (req,res) => {
    const invoiceData = {
        billNo: req.body.billNo,
        item_id: req.body.item_id,
        invoice_date: req.body.invoice_date,
        invoice_due_date: req.body.invoice_due_date,
        credit_days: req.body.credit_days,
        invoice_address: req.body.invoice_address,
        description: req.body.description,
        item_name: req.body.item_name,
        market_price: req.body.market_price,
        unit_price: req.body.unit_price,
        ordered_quantity: req.body.ordered_quantity,
        invoiced_quantity: req.body.invoiced_quantity,
        tax: req.body.tax
    }
    Invoice.findOne({
        where: {
            billNo: req.body.billNo
        }
    }).then(indata => {
        if(!indata || indata.length == 0) {
            Invoice.create(invoiceData).then(invoices => {
                let response = {
                    data: invoices,
                    status: 200,
                    statusCode: 0,
                    message: 'Success'
                }
                res.send(response)
          }).catch( err => {
              res.send(err.message)
          })
        } else { res.send('Invoice details has been already present for this billNo')}
    }).catch( err => {
      res.send(err.message)
    })
})

// Fetch Invoice by Item Id

router.get('/invoice_by_item_id', (req,res) => {
    Invoice.findAll({
        where: {
            item_id: req.query.item_id
        }
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.json({message: err.message})
    })
})

// Fetch Invoice by BillNo

router.get('/invoice_by_billNo', (req,res) => {
    Invoice.findAll({
        where: {
            billNo: req.query.billNo
        }
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.json({message: err.message})
    })
})

module.exports = router;