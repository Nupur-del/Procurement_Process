const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

const Budget = require('../models/budget.model');
const locationDetails = require('../models/datalocation.model');
const departmentDetails = require('../models/department.model');

router.get('/budget_by_deptID', (req,res) => {
        departmentDetails.findOne({
            where: {
                department_name: req.query.department
            }
        }).then(dept => {
            locationDetails.findOne({
                where: {
                    locName: req.query.location
                }
            }).then(loc => {
                        Budget.findOne({
                            where: {
                                department: dept.id,
                                location: loc.locLocationPK
                            }
                        }).then(data => {
                                res.send({
                                    department: dept.department_name,
                                    location: loc.locName,
                                    budget: data.budget,
                                    current_balance: data.current_balance
                                })
                            }).catch(err => {
                                res.json({message: err.message})
                            })
            }).catch(err => {
                    res.send(err);
                })
            }).catch(err => {
                    res.send(err);
                })
})

module.exports = router;