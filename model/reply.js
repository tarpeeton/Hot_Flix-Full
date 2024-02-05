const mongoose = require("mongoose");
const DeafultSchema = mongoose.Schema({
    commentID: { type: mongoose.Types.ObjectId, ref: "comment", index: true, required: true },
    userID: { type: mongoose.Types.ObjectId, ref: "user", index: true, required: true },
    message: { type: String, required: true },
    like: { type: Number, default: 0 },
}, {
    timestamps: true
})

module.exports = mongoose.model("reply", DeafultSchema)

