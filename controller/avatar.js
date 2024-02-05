const AvatarModel = require("../model/avatar");
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
        const result = new AvatarModel({ image: arrayImage })
        result.save()
        SuccessCallback(result, req, res, next)
    }
    catch (error) {
        ErrorCallback(error.message, req, res, next)
    }
}
exports.GetAllDatas = async (req, res, next) => {
    const result = new MyClass(AvatarModel, req, res, next)
    result.getDatas(10)
}
exports.GetSingleData = async (req, res, next) => {
    const result = new MyClass(AvatarModel, req, res, next)
    result.getData()
}
exports.UpdateSingleData = async (req, res, next) => {
    const result = new MyClass(AvatarModel, req, res, next)
    result.updateSingleDataWithFile("image", "uploads")
}
exports.DeleteSingleData = async (req, res, next) => {
    const result = new MyClass(AvatarModel, req, res, next)
    result.deleteSingleDataWithFile("image", "uploads")
}