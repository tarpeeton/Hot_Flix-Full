const mongoose = require("mongoose");
const DeafultSchema = mongoose.Schema({
    image: [{ type: String, require: true }],
}, {
    timestamps: true
})

module.exports = mongoose.model("avatar", DeafultSchema)