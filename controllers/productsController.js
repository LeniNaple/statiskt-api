const express = require('express')
const controller = express.Router()

const productSchema = require('../schemas/productSchemas')

// Unsecured 
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
                imageName: product.imageName
            })
        }
        res.status(200).json(products)
    } else {
        res.status(400).json()
    }
})

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
                imageName: product.imageName
            })
        }
        res.status(200).json(products)
    } else {
        res.status(400).json()
    }
})

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
                imageName: product.imageName
            })
        }
        res.status(200).json(products)
    } else {
        res.status(400).json()
    }
})

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
            imageName: product.imageName})
    } else {
        res.status(404).json()
    }
})


module.exports = controller