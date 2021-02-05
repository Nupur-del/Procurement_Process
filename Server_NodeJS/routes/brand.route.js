const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

const Brands = require('../models/brands.model');

router.get('/brandName', (req,res) => {
    Brands.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.json({message: err.message})
    })
})

router.post('/addbrand', (req, res) => {
    let brand = {
        brandName : req.body.brand
    }
    Brands.create(brand).then(details => {
        res.send(details);
    }).catch(error => {
        res.status(400).send(error);
    })
})

module.exports = router;