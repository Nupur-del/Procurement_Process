const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

const Budget = require('../models/budget.model');

router.get('/budget_by_deptID', (req,res) => {
    Budget.findOne({
        where: {
            department: req.query.department,
            location: req.query.location
        }
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.json({message: err.message})
    })
})

module.exports = router;