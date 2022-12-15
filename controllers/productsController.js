const { application } = require('express')
const express = require('express')
const { set } = require('mongoose')
const controller = express.Router()

const productSchema = require('../schemas/productSchemas')

// Open routes
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

// Closed routes
controller.route('/').post(async (req, res) => {
    const { name, description, rating, price, category, tag, imageName } = req.body

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
            imageName
        })
        if (product){
            res.status(201).json({text: `Product with article number ${product._id} was created.`})
        } else {
            res.status(400).json({text: 'Something went wrong'})
        }
    }
})

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

controller.get('test/:articleNumber', async (req, res) => {
    const { articleNumber } = await req.params.articleNumber
    const { name } = req.body.name
    console.log(articleNumber, name)

    // const product = productSchema.findById({articleNumber})
    // if (!product) {
    //     console.log(articleNumber)
    // } else {
    //     console.log(product.name, articleNumber)
    // }
}) 

   
  
 
module.exports = controller