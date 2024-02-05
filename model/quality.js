const mongoose = require("mongoose");
const DeafultSchema = mongoose.Schema({
    name: { type: String, required: true }
}, {
    timestamps: true
})

module.exports = mongoose.model("quality", DeafultSchema)

