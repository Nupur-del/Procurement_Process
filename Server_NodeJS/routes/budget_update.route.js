const sql = require('../database/db_connect');
const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

// Update the budget

router.post('/updateBudget', (req,res) => {
    const cost = req.body.budget;
    const loc = req.body.location;
    const dept = req.body.department;
    sql.query(`update budgets set budget = ${cost} where location = (select locLocationPK from datalocation \ 
        where locName = '${loc}') and department = (select id from departments \ 
        where department_name = '${dept}');`, (err,response) => {
       if (err) {
           res.send(err);
       } else {
        if (!response.message.includes('Rows matched: 0')) {
            res.status(200).send({
                message: 'updated successfully',
                statusCode: 200
            });
        } else if (response.message.includes('Rows matched: 0')) {
            res.status(404).send({
                message: 'Location or Department Not Found',
                statusCode: 404
            });
        }
       }
    });
})

module.exports = router;