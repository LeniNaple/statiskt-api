const express = require('express')
const controller = express.Router()

const productSchema = require('../schemas/productSchemas')

// Unsecured 
controller.route('/').get(async (req, res) => {
    try {
        res.status(200).json(await productSchema.find())
    } catch {
        res.status(400).json()
    }
})

controller.route('/:tag').get((req, res) => {
    const products = productSchema.find(x => x.tag == req.params.tag)

})

controller.route('/:tag/:take').get((req, res) => {
    
})

controller.route('/details/:articleNumber').get((req, res) => {
    
})


module.exports = controller