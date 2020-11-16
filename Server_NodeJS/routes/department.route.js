const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

const Department = require('../models/department.model');

router.get('/fetchDepartmentName', (req,res) => {
    Department.findAll().then(data => {
        const department = [];
        for(let i of data) {
          department.push(i.department_name);
        }
        res.send(department);
    }).catch(err => {
        res.json({message: err.message})
    })
})

module.exports = router;