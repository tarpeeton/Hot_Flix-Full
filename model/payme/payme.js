const mongoose = require('mongoose')

const PayMe = mongoose.Schema({
    transactionId: { type: String, required: true },
    time: { type: Date, required: true },
    amount: { type: Number, required: true },
    candidate: { type: String, required: true }
})
PayMe.pre('save', function () {
    const candidate = this.model('Users').findOneAndUpdate({ _id: this.candidate })
    candidate.balance = this.amount
    candidate.save({ validateBeforeSave: false })
})
module.exports = mongoose.model('PayMe', PayMe)
