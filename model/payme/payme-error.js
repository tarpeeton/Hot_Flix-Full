const mongoose = require('mongoose')

const PayMeErrorSchema = mongoose.Schema({
   code: Number,
    message: {},
    data: String,
    errorId: Number
})

module.exports = mongoose.model('PaymeError',PayMeErrorSchema)
