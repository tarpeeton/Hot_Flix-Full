const mongoose = require("mongoose");
const DeafultSchema = mongoose.Schema({
    mixedID: { type: mongoose.Types.ObjectId, ref: "mixed", index: true, required: true },
    name: {
        uz: { type: String, required: true },
        ru: { type: String, required: true },
        en: { type: String, required: true },
    },
    description: {
        uz: { type: String, required: true },
        ru: { type: String, required: true },
        en: { type: String, required: true },
    },
    image: [ // kinodan lavhalar
        {
            type: String, required: true
        }
    ],
    video: [ // ko'riladigan video - Qasoskorlar.mp4
        {
            type: String, required: true
        }
    ],
    duration: { type: String, required: true }
}, {
    timestamps: true
})

module.exports = mongoose.model("video", DeafultSchema)

