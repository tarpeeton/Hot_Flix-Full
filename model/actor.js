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
    films: { type: Number, default: 0 },
    image: [{ type: String, required: true }],
    status: {
        type: Number, required: true,
        enum: [
            1, // Режиссёр
            2, // Актёры
            3, // Актёры дубляжа
            4, // Продюсеры
            5, // Режиссёр дубляжа
            6, // Художники
            7, // Сценаристы
            8, // Монтаж

        ]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("actor", DeafultSchema)
