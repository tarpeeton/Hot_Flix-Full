const VideoModel = require("../model/video");
const MyClass = require("../config/class");
const { SuccessCallback, ErrorCallback } = require("../config/callback")
const path = require("path")
const fs = require("fs")
const ObjectId = require("mongodb").ObjectId

exports.CreateNewData = async (req, res, next) => {
    try {
        const {
            nameuz, nameru, nameen,
            descriptionuz, descriptionru, descriptionen,
            duration,
            mixedID,
        } = req.body;

        let images = []
        let videos = []


        const files = req.files;  // [1.mp4, 1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg ... 12.jpg]
        const totalFiles = []
        for (const file of files) {
            const { filename } = file;
            totalFiles.push(filename)
        }
        images = totalFiles.splice(1, 12) // [video, rasm, ....]
        videos.push(totalFiles[0]) // [video, rasm, ....]




        const result = new VideoModel({
            mixedID: mixedID,
            name: {
                uz: nameuz,
                ru: nameru,
                en: nameen,
            },
            description: {
                uz: descriptionuz,
                ru: descriptionru,
                en: descriptionen,
            },
            duration: duration,
            video: videos,
            image: images,
        })
        await result.save()
        SuccessCallback(result, req, res, next)
    }
    catch (error) {
        ErrorCallback(error.message, req, res, next)
        console.log(error.message)
    }
}
exports.GetAllDatas = async (req, res, next) => {
    const result = new MyClass(VideoModel, req, res, next)
    result.getDatas(10, "mixedID")
}
exports.GetSingleData = async (req, res, next) => {
    const result = new MyClass(VideoModel, req, res, next)
    result.getData("mixedID")
}

exports.UpdateSingleDataContext = async (req, res, next) => {
    const result = new MyClass(VideoModel, req, res, next)
    result.updateSingleDataWithoutFile()
}
exports.UpdateSingleDataImage = async (req, res, next) => {
    const result = new MyClass(VideoModel, req, res, next)
    result.updateSingleDataWithFile("image", "uploads")
}
exports.UpdateSingleDataVideo = async (req, res, next) => {
    const result = new MyClass(VideoModel, req, res, next)
    result.updateSingleDataWithFile("video", "uploads")
}
exports.DeleteData = async (req, res, next) => {
    await VideoModel.findById(req.params.id)
        .exec(async (error, data) => {
            if (error) ErrorCallback(error.message, req, res, next)
            else {
                const images = data.image
                const videos = data.video
                const unlinks = (files) => {
                    for (let file of files) {
                        const filePath = path.join(__dirname, `../public/uploads/` + file)
                        fs.unlink(filePath, function (error) { })
                    }
                }
                unlinks(images)
                unlinks(videos)

                await VideoModel.findByIdAndDelete(req.params.id)
                SuccessCallback([], req, res, next)
            }
        })
}
exports.FilterByMixed = async (req, res, next) => {
    const { mixedID } = req.query
    const result = await VideoModel.find({ mixedID: mixedID }).sort({ createdAt: -1 }).lean()
    res.json({ data: result })
}

exports.GetData = async (req, res, next) => {
    const { videoID } = req.query
    // $match = .find()
    // $project = .select()
    // $lookup = .populate()

    const result = await VideoModel.aggregate(
        [
            { $match: { _id: { $eq: new ObjectId(videoID) } } },
            { $lookup: { from: "mixeds", let: { mixedID: "$_id" }, pipeline: [], as: "all", }, },
            {
                $project: {
                    "name": 1,
                    "description": 1,
                    "video": 1,
                    "duration": 1,
                    "all": {
                        $filter: {
                            input: "$all",
                            as: "item",
                            cond: { $eq: ["$$item._id", "$mixedID"] }
                        }
                    },
                    "populates": {
                        $filter: {
                            input: "$all",
                            as: "item",
                            cond: { $eq: ["$$item._id", "$mixedID"] }
                        }
                    },
                }
            },
            { $lookup: { from: "years", localField: "populates.yearID", foreignField: "_id", as: "all-years" } },
            { $lookup: { from: "countries", localField: "populates.countryID", foreignField: "_id", as: "all-countries" } },
            { $lookup: { from: "categories", localField: "populates.categoryID", foreignField: "_id", as: "all-categories" } },
            { $lookup: { from: "genres", localField: "populates.genreID", foreignField: "_id", as: "all-genres" } },
            { $lookup: { from: "languages", localField: "populates.languageID", foreignField: "_id", as: "all-languages" } },
            { $lookup: { from: "qualities", localField: "populates.qualityID", foreignField: "_id", as: "all-qualities" } },
            { $lookup: { from: "actors", localField: "populates.actorID", foreignField: "_id", as: "all-actors" } },
            { $lookup: { from: "ages", localField: "populates.ageID", foreignField: "_id", as: "all-ages" } },
            { $lookup: { from: "tags", localField: "populates.tagID", foreignField: "_id", as: "all-tags" } },
            {
                $project: {
                    "name": 1,
                    "description": 1,
                    "video": 1,
                    "duration": 1,
                    "all.image": 1,
                    "all.imdb": 1,
                    "all.link": 1,
                    "all-years": { $map: { input: "$all-years", as: "item", in: ["$$item.name", { _id: "$$item._id" }] } },
                    "all-countries": { $map: { input: "$all-countries", as: "item", in: ["$$item.name", { _id: "$$item._id" }] } },
                    "all-categories": { $map: { input: "$all-categories", as: "item", in: ["$$item.name", { _id: "$$item._id" }] } },
                    "all-genres": { $map: { input: "$all-genres", as: "item", in: ["$$item.name", { _id: "$$item._id" }] } },
                    "all-languages": { $map: { input: "$all-languages", as: "item", in: ["$$item.name", { _id: "$$item._id" }] } },
                    "all-qualities": { $map: { input: "$all-qualities", as: "item", in: ["$$item.name", { _id: "$$item._id" }] } },
                    "all-actors": { $map: { input: "$all-actors", as: "item", in: ["$$item.name", { _id: "$$item._id" }, { status: "$$item.status" }] } },
                    "all-ages": { $map: { input: "$all-ages", as: "item", in: ["$$item.name", { _id: "$$item._id" }] } },
                    "all-tags": { $map: { input: "$all-tags", as: "item", in: ["$$item.name", { _id: "$$item._id" }] } },

                }
            },
        ]
    )
    res.json(result)
}
