const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

const PO = require('../models/PO.model');
const PO_attachments = require('../models/po_attachments.model');
const PO_status = require('../models/po_status.model');

// Create PO

router.post('/po', (req,res) => {
    const poData = {
        billNo: req.body.billNo,
        order_id: req.body.order_id, 
        item_id: req.body.item_id, 
        reqName:  req.body.reqName,
        urg_msg:  req.body.urg_msg,
        reason:  req.body.reason,
        comment:  req.body.comment,
        behalf:  req.body.behalf,
        purchase_type:  req.body.purchase_type,
        message:  req.body.message,
        currency:  req.body.currency,
        org_billed:  req.body.org_billed,
        cmp_name:  req.body.cmp_name,
        location:  req.body.location,
        bill_to_address:  req.body.bill_to_address,
        delivery_to:  req.body.delivery_to,
        required_by:  req.body.required_by,
        delivery_address:  req.body.delivery_address,
        cost_center:  req.body.cost_center,
        project_code:  req.body.project_code,
        budget_code:  req.body.budget_code,
        item_name: req.body.item_name,
        quantity:  req.body.quantity,
        price:  req.body.price,
        total:  req.body.total
    }
    const poAttachment = {
        billNo: req.body.billNo,
        attachments:  req.body.attachments
    }
    const poStatus = {
        billNo: req.body.billNo,
        order_id: req.body.order_id,
        status: req.body.status
    }
    PO.create(poData).then(response => {
        let result = {
            data: response,
            status: 200,
            statusCode: 0,
            message: 'Success'
        }
        PO_attachments.create(poAttachment).then(response => {
            console.log(response);
            PO_status.create(poStatus).then(response => {
                result.data = response,
                result.message = 'Purchase Order submitted Successfully'
                res.send(result);
            }).catch(err => { res.send(err.message)})
        }).catch(err => { res.send(err.message)})
    }).catch(err => { res.send(err.message)})
})

// Fetch PO by billNo

router.get('/po_by_billNo', (req, res) => {
    PO.findAll({
        where: {
            billNo: req.query.billNo
        }
    }).then(response => {
        res.send(response)
    }).catch(err => {
        res.send(err.message)
    })
})

// Fetch and Count all

router.get('/allPo', (req,res) => {
    PO.findAndCountAll().then(result => {
        res.send(result)
    }).catch(err => {res.send(err.message)})
})

// PO by status

router.get('/allPo_byStatus', (req, res) => {
    PO.findAll({
        where: {
            po_status: req.query.status
        }
    }).then(result => {
        res.send(result)
    }).catch(err => {res.send(err.message)})
})

module.exports = router;