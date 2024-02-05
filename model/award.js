const mongoose = require("mongoose");
const DeafultSchema = mongoose.Schema({
    mixedID: { type: mongoose.Types.ObjectId, ref: "mixed", index: true, required: true },
    name: {
        uz: { type: String, require: true },
        ru: { type: String, require: true },
        en: { type: String, require: true },
    },
    year: { type: String, require: true },
    image: [
        { type: String, require: true }
    ],
    status: [
        {
            action: {
                type: Number,
                required: true,
                enum: [
                    1, // G'alaba
                    2, // Nomitsiya
                ]
            },
            nomination: [
                { type: mongoose.Types.ObjectId, ref: "nomination", index: true, required: true }
            ]
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model("award", DeafultSchema)


