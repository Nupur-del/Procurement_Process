const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

const Cities = require('../models/cities.model');

router.get('/citiesName', (req,res) => {
    Cities.findAll().then(data => {
        const location = [];
        for(let i of data) {
          location.push(i.location);
        }
        res.send(location);
    }).catch(err => {
        res.json({message: err.message})
    })
})

module.exports = router;