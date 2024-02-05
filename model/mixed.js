const mongoose = require("mongoose");
const DeafultSchema = mongoose.Schema({
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
    yearID: [
        {
            type: mongoose.Types.ObjectId, ref: "year", required: true, index: true
        }
    ],
    countryID: [
        {
            type: mongoose.Types.ObjectId, ref: "country", required: true, index: true
        }
    ],
    categoryID: [
        {
            type: mongoose.Types.ObjectId, ref: "category", required: true, index: true
        }
    ],
    genreID: [
        {
            type: mongoose.Types.ObjectId, ref: "genre", required: true, index: true
        }
    ],
    languageID: [
        {
            type: mongoose.Types.ObjectId, ref: "language", required: true, index: true
        }
    ],
    qualityID: [
        {
            type: mongoose.Types.ObjectId, ref: "quality", required: true, index: true
        }
    ],
    actorID: [
        {
            type: mongoose.Types.ObjectId, ref: "actor", required: true, index: true
        }
    ],
    ageID: [
        {
            type: mongoose.Types.ObjectId, ref: "age", required: true, index: true
        }
    ],
    tagID: [
        {
            type: mongoose.Types.ObjectId, ref: "tag", required: true, index: true
        }
    ],

    payment: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: [
            "1", // doimiy tekin bo'lgan kino
            "2", // tarif sotib olib malum br vaqtgacha ko'riladigan kino
            "3", // butunlay sotib olasan, doim ko'rish
        ]
    },
    types: {
        type: String,
        required: true,
        enum: [
            "1", // kino
            "2", // multfilm
            "3", // serial
        ]
    },
    rating: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
    image: [
        { type: String, required: true }
    ],
    imdb: { type: Number, default: 0 },
    link: { type: String, required: true }
}, {
    timestamps: true
})

module.exports = mongoose.model("mixed", DeafultSchema)


