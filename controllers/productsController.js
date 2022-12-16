const { application } = require('express')
const express = require('express')
const { set } = require('mongoose')
const controller = express.Router()

const productSchema = require('../schemas/productSchemas')

// Take all products
controller.route('/').get(async (req, res) => {
    const products = []
    const list = await productSchema.find()
    if (list) {
        for(let product of list) {
            products.push({
                articleNumber: product._id,
                name: product.name,
                description: product.description,
                rating: product.rating,
                price: product.price,
                category: product.category,
                tag: product.tag,
                oldPrice: product.oldPrice,
                imageName: product.imageName
            })
        }
        res.status(200).json(products)
    } else {
        res.status(400).json()
    }
})

// Take products by tag
controller.route('/:tag').get(async (req, res) => {
    const products = []
    const list = await productSchema.find({tag: req.params.tag })
    if (list) {
        for(let product of list) {
            products.push({
                articleNumber: product._id,
                name: product.name,
                description: product.description,
                rating: product.rating,
                price: product.price,
                category: product.category,
                tag: product.tag,
                oldPrice: product.oldPrice,
                imageName: product.imageName
            })
        }
        res.status(200).json(products)
    } else {
        res.status(400).json()
    }
})

// Take certain number of products by tag
controller.route('/:tag/:take').get(async (req, res) => {
    const products = []
    const list = await productSchema.find({tag: req.params.tag }).limit(req.params.take)
    if (list) {
        for(let product of list) {
            products.push({
                articleNumber: product._id,
                name: product.name,
                description: product.description,
                rating: product.rating,
                price: product.price,
                category: product.category,
                tag: product.tag,
                oldPrice: product.oldPrice,
                imageName: product.imageName
            })
        }
        res.status(200).json(products)
    } else {
        res.status(400).json()
    }
})

// Take specific product
controller.route('/product/details/:articleNumber').get(async (req, res) => {
    const product = await productSchema.findById(req.params.articleNumber)
    if (product) {
        res.status(200).json({articleNumber: product._id,
            name: product.name,
            description: product.description,
            rating: product.rating,
            price: product.price,
            category: product.category,
            tag: product.tag,
            oldPrice: product.oldPrice,
            imageName: product.imageName})
    } else {
        res.status(404).json()
    }
}) 



// Create a product
controller.route('/').post(async (req, res) => {
    const { name, description, rating, price, category, tag, oldPrice, imageName } = req.body

    if (!name || !price ) {
        res.status(400).json({text: 'Name and price is required'})
    }
    const item_exists = await productSchema.findOne({name})
    if (item_exists) {
        res.status(409).json({text: 'A product with this name already exist'})
    } else {
        const product = await productSchema.create({
            name, 
            description, 
            rating, 
            price, 
            category, 
            tag, 
            oldPrice, 
            imageName
        })
        if (product){
            res.status(201).json({text: `Product with article number ${product._id} was created.`})
        } else {
            res.status(400).json({text: 'Something went wrong'})
        }
    }
})

// Delete a product
controller.route('/delete/:articleNumber').delete(async (req, res) => {
    if (!req.params.articleNumber) {
        res.status(400).json({text: `No article number was specified.`})
    } else {
        const item = await productSchema.findById(req.params.articleNumber)
        if (item) {
           await productSchema.remove(item)
           res.status(200).json({text: `Product with article number ${req.params.articleNumber} was deleted.`})
        } else {
            res.status(404).json({text: `Product with article number ${req.params.articleNumber} wasnt found.`})
        }
    }
})

// Update a product
controller.route('/patch/:articleNumber').patch(async (req, res) => {
    if (!req.params.articleNumber) {
        res.status(400).json({text: `No article number was specified.`})
    } else {
        await productSchema.updateOne(
            { _id: req.params.articleNumber},
            { $set: {name: req.body.name}
        });
        await productSchema.updateOne(
            { _id: req.params.articleNumber},
            { $set: {description: req.body.description}
        });
        await productSchema.updateOne(
            { _id: req.params.articleNumber},
            { $set: {rating: req.body.rating}
        });
        await productSchema.updateOne(
            { _id: req.params.articleNumber},
            { $set: {price: req.body.price}
        });
        await productSchema.updateOne(
            { _id: req.params.articleNumber},
            { $set: {category: req.body.category}
        });
        await productSchema.updateOne(
            { _id: req.params.articleNumber},
            { $set: {tag: req.body.tag}
        });
        await productSchema.updateOne(
            { _id: req.params.articleNumber},
            { $set: {oldPrice: req.body.oldPrice}
        });
        await productSchema.updateOne(
            { _id: req.params.articleNumber},
            { $set: {imageName: req.body.imageName}
        });
        res.status(200).json({text: `Updated name: ${req.body.name} ...`})    
    }
})
  
  

 
module.exports = controller