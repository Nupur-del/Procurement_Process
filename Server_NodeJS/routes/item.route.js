const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

const Items = require('../models/item.model');
const Item_images = require('../models/item_image.model');

// Add item

router.post('/items', (req, res) => {
    console.log(req.body);
    let item_id;
    if (!req.body.item_id || (req.body.action = "replicate")) {
     item_id = Math.floor(Math.random() * 10000) + 1;
    } else {
        item_id = req.body.item_id;
    }
    const ItemData =  {
        item_id: item_id,
        name: req.body.name,
        sku: req.body.sku,
        brand: req.body.brand,
        price: req.body.price,
        currency: req.body.currency,
        features: req.body.features,
        desc: req.body.desc,
        discount: req.body.discount,
        quantity: req.body.quantity,
        threshold: req.body.threshold,
        warranty: req.body.warranty,
        policy: req.body.policy,
        location: req.body.location
    }
    Items.findOne({
        where: {
            item_id: item_id
        }
    }).then(item => {
        if(!item || item.length == 0) {
            Items.create(ItemData).then(item => {
              if(req.body.imageName) {
                let ItemImages = {};
                for (let i of req.body.imageName) {
                    ItemImages = {
                        item_id: item_id,
                        imageName: i
                    };
                    Item_images.create(ItemImages).then(image => {
                        res.json({
                            data: image,
                            message: 'Item added successfully with images'
                        })
                    })
                    .catch(err => {res.send(err)})
                }
                res.send(item);
              } else { res.json({message: 'Item added successfully without Images'}) }
            }).catch(err => {res.json({message : err.message})})
        } else {
            res.json({message: 'Item with the provided Id is already present'});
        }
    }).catch(err => {res.send(err)})
})

// Fetch items by item_id

router.get('/item_by_id', (req,res) => {
    Items.findOne({
        where: {
            item_id : req.query.item_id
        }
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.json({message: err.message})
    })
})

// Fetch all item

router.get('/allItems', (req,res) => {
    Items.findAll().then(data => {
        res.send(data)
    }).catch(err => {
        res.json({message: err.message})
    })
})

// Delete all Items

router.delete('/deleteItems', (req, res) => {
    Items.findOne({
        where: {
            item_id: req.query.item_id
        }
    }).then(item => {
        if(item) {
            Item_images.destroy({
                where: {
                  item_id: req.query.item_id
                }
            }).then(result => {
                Items.destroy({
                    where:{
                        item_id: req.query.item_id
                    }
                }).then(item => {
                    res.json({message: 'Item has been deleted Successfully'})
                }).catch(err => {
                    res.json({message : err.message})
                })
            }).catch(err => {
                res.send(err.message)
            })
        } else {
            res.json({message: 'Item is not available with provided id'})
         }
      }
    )
})

// Fetch and count the item

router.get('/itemCount', (req, res) => {
    Items.findAndCountAll().then(result => {
         res.send(result);
    }).catch( err => {
        res.send(err);
    })
})

// Fetch all item images

router.get('/allImages', (req,res) => {
  Item_images.findAll().then(images => {
      res.send(images);
  }).catch(err => {
      res.send(err.message);
  })  
})

// Fetch images by item_id 

router.get('/images_by_id', (req,res) => {
    Item_images.findAll({
        where:{
            item_id: req.query.item_id
        }
    }).then(images => {
        if(images.length !== 0) {
            res.send(images);
        } else {
            let response = {
                data: null,
                status: 409,
                statusCode: 1,
                message: 'No images are available for provided item_id'
            }
            res.send(response);
        }
    }).catch(err => {
        res.send(err);
    })
})

module.exports = router;