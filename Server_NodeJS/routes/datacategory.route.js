const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

const Category = require('../models/datacategory.model');

router.get('/categories', (req,res) => {
    Category.findAll().then(data => {
        const cate= [];
        for(let i of data) {
          cate.push(i.catName);
        }
        res.send(cate);
    }).catch(err => {
        res.json({message: err.message})
    })
})

module.exports = router;