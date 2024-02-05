const Mixed = require("../model/mixed");


exports.homePage = async (req, res, next) => {
    const movie = await Mixed
        .find({ types: { $eq: "1" } })
        .select({
            name: 1, status: 1, image: 1, imdb: 1
        })
        .sort({ createdAt: -1 })
        .skip(0)
        .limit(3)
        .lean()

    const serial = await Mixed
        .find({ types: { $eq: "3" } })
        .select({
            name: 1, status: 1, image: 1, imdb: 1
        })
        .sort({ createdAt: -1 })
        .skip(0)
        .limit(3)
        .lean()

    const multfilm = await Mixed
        .find({ types: { $eq: "2" } })
        .select({
            name: 1, status: 1, image: 1, imdb: 1
        })
        .sort({ createdAt: -1 })
        .skip(0)
        .limit(3)
        .lean()

    const slider = {
        movie: movie,
        serial: serial,
        cartoon: multfilm,
    }

    res.json(slider)




}