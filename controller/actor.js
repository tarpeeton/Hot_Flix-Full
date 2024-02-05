const ActorModel = require("../model/actor");
const MyClass = require("../config/class")
const { SuccessCallback, ErrorCallback } = require("../config/callback")

exports.CreateNewData = async (req, res, next) => {
    try {
        const files = req.files;
        const arrayImage = [];
        for (const image of files) {
            const { filename } = image;
            arrayImage.push(filename)
        }
        const { nameuz, nameru, nameen, descriptionuz, descriptionru, descriptionen, status } = req.body;
        const result = new ActorModel({
            image: arrayImage,
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
            status: status
        })
        result.save()
        SuccessCallback(result, req, res, next)
    }
    catch (error) {
        ErrorCallback(error.message, req, res, next)
    }
}
exports.GetAllDatas = async (req, res, next) => {
    const result = new MyClass(ActorModel, req, res, next)
    result.getDatas(10)
}
exports.GetSingleData = async (req, res, next) => {
    const result = new MyClass(ActorModel, req, res, next)
    result.getData()
}
exports.UpdateSingleDataContext = async (req, res, next) => {
    const result = new MyClass(ActorModel, req, res, next)
    result.updateSingleDataWithoutFile()
}
exports.UpdateSingleDataFile = async (req, res, next) => {
    const result = new MyClass(ActorModel, req, res, next)
    result.updateSingleDataWithFile("image", "uploads")
}
exports.DeleteSingleData = async (req, res, next) => {
    const result = new MyClass(ActorModel, req, res, next)
    result.deleteSingleDataWithFile("image", "uploads")
}