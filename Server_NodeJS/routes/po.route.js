const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

const PO = require('../models/PO.model');
const PO_item = require('../models/po_item.model');
const PO_attachments = require('../models/po_attachments.model');
const Order_item = require('../models/order_item.model');
const Order = require('../models/order.model');
const OrderStatus = require('../models/order_status.model');

// Create PO

router.post('/po', (req,res) => {
    const poData = {
        billNo: req.body.billNo,
        urg_msg:  req.body.urg_msg,
        reason:  req.body.reason,
        comment:  req.body.comment,
        behalf:  req.body.behalf,
        purchase_type:  req.body.purchase_type,
        location: req.body.location,
        supplier: req.body.supplier,
        currency:  req.body.currency,
        cmp_name:  req.body.cmp_name,
        bill_to_address:  req.body.bill_to_address,
        delivery_to:  req.body.delivery_to,
        required_by:  req.body.required_by,
        invoice_status: 13,
        delivery_address:  req.body.delivery_address,
        cost_center:  req.body.cost_center,
        project_code:  req.body.project_code,
        budget_code:  req.body.budget_code,
        po_status: req.body.status,
        total:  req.body.total
    }
    PO.create(poData).then(response => {
        let result = {
            data: response,
            status: 200,
            statusCode: 0,
            message: 'Success'
        }
        if (req.body.attachments.length !== 0) {
            let poAttachment = [];
            for (let i of req.body.attachments) {
              let createdAttachment = {
                    billNo: req.body.billNo,
                    attachments:  i
                }
                poAttachment.push(createdAttachment);
            }
            PO_attachments.bulkCreate(poAttachment, {returning: true}).then(response => {
                result.data = response
            }).catch(err => { res.send(err.message)})
        }
        let poItem = [];
        for (let j of req.body.item) {
           let createdData = {
                billNo: req.body.billNo,
                order_id: j.order_id,
                item_id: j.item_id
             };
             poItem.push(createdData);
        }
        PO_item.bulkCreate(poItem, {returning: true}).then(item => {
            result.data = item;
            result.message = 'Purchase Order submitted Successfully';
            res.send(result);
        }).catch(err => { res.send(err.message)})
    }).catch(err => { res.send(err.message)})
})

// Fetch and Count all

router.get('/allPo', (req,res) => {
    PO.findAndCountAll().then(result => {
        res.send(result);
        console.log(result);
    }).catch(err => {res.send(err.message)})
})

router.get('/all', (req,res) => {
    PO.findAll().then(result => {
        res.send(result);
        console.log(result);
    }).catch(err => {res.send(err.message)})
})
// PO by status

router.get('/allPo_byStatus', (req, res) => {
    PO.findAll({
        where: {
            po_status: req.query.status,
            suppier: req.query.user
        }
    }).then(result => {
        res.send(result)
    }).catch(err => {res.send(err.message)})
})

router.put('/update_po_status', (req, res) => {
   PO.update({
       message_client: req.body.message,
       po_status: req.body.po_status,
       total: req.body.total
   },
   {   returning: true,
       where: { billNo: req.body.billNo }
   }).then(updated => {
       console.log(updated);
       let result = {
           data: updated,
           message: 'Updated PO successfully'
       };
       for (let i of req.body.item) {
           Order_item.update({
             status: i.status
           }, {
               returning: true,
               where: {id: i.id}
           }).then(u => {
               result.message = 'Updated item status successfully'
           }).catch(error => {
               console.log(error);
           });
       }
       res.send(result);
   }).catch(err => {
       res.status(404).send({
           message: 'Do not exist'
       });
   });
})


router.put('/poTrack', (req, res) => {
    console.log(req.body);
    PO.update({
        message_client: req.body.order_msg,
        po_status: req.body.order_status,
        estimated_arrival: req.body.estimated_arrival,
        tracking_link: req.body.tracking_link
    },
    {   returning: true,
        where: { billNo: req.body.billNo }
    }).then(updated => {
        console.log(updated);
        let result = {
            data: updated,
            message: 'Updated PO successfully'
        };
        for (let i of req.body.item) {
            Order_item.update({
              status: i.status,
              estimated_arrival: req.body.estimated_arrival,
              tracking_link: req.body.tracking_link
            }, {
                returning: true,
                where: {id: i.item_id}
            }).then(u => {
                result.message = 'Updated item status successfully'
            }).catch(error => {
                console.log(error);
            });
        }
        res.send(result);
    }).catch(err => {
        res.status(404).send({
            message: 'Do not exist'
        });
    });
 })


// Fetch order_id and item_id by billNo

router.get('/fetchOrders', (req,res) => {
    PO_item.findAll({
        where: {
            billNo: req.query.billNo
        }
    }).then(Orders => {
        res.send(Orders);
    }).catch(err => {
        res.send(err);
    })
})

// Remove PO

router.delete('/removePO', (req, res) => {
    PO.findOne({
        where: {
            billNo: req.query.billNo
        }
    }).then(po => {
        if (po) {
            PO_attachments.destroy({
                where: {
                    billNo: req.query.billNo
                }
            }).then(attach => {
                PO_item.destroy({
                    where: {
                        billNo: req.query.billNo
                    }
                }).then(item => {
                    PO.destroy({
                        where: {
                            billNo: req.query.billNo
                        }
                    }).then(deletePO => {
                        res.send({
                            data: deletePO,
                            message: 'PO deleted Successfully',
                            statusCode: 200
                        })
                    }).catch(error => {
                        res.send(error);
                    })
                }).catch(er => {
                    res.send(er);
                }).catch(ErrorP => {
                    res.send(ErrorP);
                })
            })
        } else {
            res.status(404).send({
                message: 'PO with this billNo does not exist'
            })
        }
    }).catch(err => {
        res.send(err);
    })
})

module.exports = router;