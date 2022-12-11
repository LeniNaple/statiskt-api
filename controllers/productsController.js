let products = require('../data/database')
const express = require('express')
const controller = express.Router()

controller.param("articleNumber", (req, res, next, articleNumber) => {
    req.product = products.find(x => x.articleNumber == articleNumber)
    next()
})

controller.param("tag", (req, res, next, tag) => {
    req.products = products.filter(x => x.tag == tag)
    next()
})


// http://localhost:5000/api/products/details/articleNumber
controller.route('/details/:articleNumber').get((req, res) => {

    if(req.product != undefined) {
        res.status(200).json(req.product)
    } else
        res.status(404).json()
})

// http://localhost:5000/api/products/tag
controller.route('/:tag').get((req, res) => {

    if(req.products != undefined) {
        res.status(200).json(req.products)
    } else
        res.status(404).json()
})

// http://localhost:5000/api/products/tag/number
controller.route('/:tag/:take').get((req, res) => {
    let list = []

    for (let i = 0; i < Number(req.params.take); i++)
        list.push(req.products[i])

        res.status(200).json(list)
})


// http://localhost:${port}/api/products/
controller.route('/').get((req, res) => {
    res.status(200).json(products)
})


module.exports = controller
