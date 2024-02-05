const mongoose = require("mongoose");
const DeafultSchema = mongoose.Schema({
    mixedID: { type: mongoose.Types.ObjectId, ref: "mixed", index: true, required: true },
    rating: {
        type: Number,
        required: true,
        enum: [
            1, 1.5,
            2, 2.5,
            3, 3.5,
            4, 4.5,
            5, 5.5,
            6, 6.5,
            7, 7.5,
            8, 8.5,
            9, 9.5,
            10,
        ]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("imdb", DeafultSchema)