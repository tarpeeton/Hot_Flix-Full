const mongoose = require("mongoose");
const DeafultSchema = mongoose.Schema({
    videoID: { type: mongoose.Types.ObjectId, ref: "video", index: true, required: true },
    userID: { type: mongoose.Types.ObjectId, ref: "user", index: true, required: true },
    message: { type: String, required: true },
    like: { type: Number, default: 0 },
}, {
    timestamps: true
})

module.exports = mongoose.model("comment", DeafultSchema)

