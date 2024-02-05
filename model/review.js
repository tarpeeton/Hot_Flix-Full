const mongoose = require("mongoose");
const DeafultSchema = mongoose.Schema({
    mixedID: { type: mongoose.Types.ObjectId, ref: "mixed", index: true, required: true },
    userID: { type: mongoose.Types.ObjectId, ref: "user", index: true, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true, enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    like: { type: Number, default: 0 }
}, {
    timestamps: true
})

module.exports = mongoose.model("review", DeafultSchema)

