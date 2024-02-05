const mongoose = require("mongoose");
const DeafultSchema = mongoose.Schema({
    mixedID: { type: mongoose.Types.ObjectId, ref: "mixed", index: true, required: true },
    rating: {
        type: Number,
        required: true,
        enum: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("rating", DeafultSchema)