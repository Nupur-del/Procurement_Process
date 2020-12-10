const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

const Brands = require('../models/brands.model');

router.get('/brandName', (req,res) => {
    Brands.findAll().then(data => {
        console.log(data);
        res.send(data);
    }).catch(err => {
        res.json({message: err.message})
    })
})

module.exports = router;