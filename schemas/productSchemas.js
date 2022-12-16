const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: mongoose.Schema.Types.String, required: true},
    description: {type: mongoose.Schema.Types.String},
    price: {type: mongoose.Schema.Types.Number, required: true},
    oldPrice: {type: mongoose.Schema.Types.String},
    category: {type: mongoose.Schema.Types.String},
    rating: {type: mongoose.Schema.Types.Number},
    tag: {type: mongoose.Schema.Types.String},
    imageName: {type: mongoose.Schema.Types.String}
})

module.exports = mongoose.model("products", productSchema)