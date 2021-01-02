const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

const Invoice = require('../models/invoice.model');
const InvoiceItem = require('../models/invoice_item.model');

// Create Invoice

router.post('/invoice', (req,res) => {
    const invoiceData = {
        billNo: req.body.billNo,
        invoice_date: req.body.invoice_date,
        invoice_due_date: req.body.invoice_due_date,
        credit_days: req.body.credit_days,
        invoice_address: req.body.invoice_address,
        description: req.body.description,
        tax: req.body.tax,
        total: req.body.total
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
                let invoice_item = [];
                for (let i of req.body.item) {
                    invoice_item.push({
                        market_price: i.market_price,
                        invoiced_quantity: i.invoiced_quantity,
                        item_id: i.item_id,
                        Total_price: i.total_price,
                        invoice_no: invoices.invoice_no
                    })
                }
                InvoiceItem.bulkCreate(invoice_item, {returning: true}).then(item => {
                    response.message = 'Invoice created Sucessfully'
                    res.send(response);
                }).catch( error => {
                    res.status(404).send(error.message);
                })
          }).catch( err => {
              res.status(404).send(err.message);
          })
        } else { res.status(404).send('Invoice details has been already present for this billNo')}
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

module.exports = router;