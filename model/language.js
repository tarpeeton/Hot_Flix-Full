const mongoose = require("mongoose");
const DeafultSchema = mongoose.Schema({
    name: {
        uz: { type: String, required: true },
        ru: { type: String, required: true },
        en: { type: String, required: true },
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("language", DeafultSchema)

