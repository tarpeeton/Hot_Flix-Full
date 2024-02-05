const MixedModel = require("../model/mixed");
const MyClass = require("../config/class");
const { SuccessCallback, ErrorCallback } = require("../config/callback");
const ObjectId = require("mongodb").ObjectId

exports.CreateNewData = async (req, res, next) => {
    try {
        const {
            nameuz, nameru, nameen,
            descriptionuz, descriptionru, descriptionen,
            payment,
            status,
            yearID,
            countryID,
            categoryID,
            genreID,
            languageID,
            qualityID,
            actorID,
            ageID,
            tagID,
            link,
            types
        } = req.body;


        const setArray = (arrays) => {
            const defaultArray = []
            for (let item of arrays) {
                const values = item;
                defaultArray.push(values)
            }
            return defaultArray
        }

        // Faylni arrayga yuklash
        const files = req.files;
        const imageArray = []
        for (const file of files) {
            const { filename } = file;
            imageArray.push(filename)
        }
        const result = new MixedModel({
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
            status: status,
            types: types,
            payment: payment,
            yearID: setArray(yearID),
            countryID: setArray(countryID),
            categoryID: setArray(categoryID),
            genreID: setArray(genreID),
            languageID: setArray(languageID),
            qualityID: setArray(qualityID),
            actorID: setArray(actorID),
            ageID: setArray(ageID),
            tagID: setArray(tagID),
            link: link,
            image: imageArray
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
    const result = new MyClass(MixedModel, req, res, next)
    result.getDatas(
        10,
        "yearID",
        "countryID",
        "categoryID",
        "genreID",
        "languageID",
        "qualityID",
        "actorID",
        "ageID",
        "tagID",
    )
}
exports.GetSingleData = async (req, res, next) => {
    const result = new MyClass(MixedModel, req, res, next)
    result.getData(
        "yearID",
        "countryID",
        "categoryID",
        "genreID",
        "languageID",
        "qualityID",
        "actorID",
        "ageID",
        "tagID",)
}
exports.UpdateSingleDataContext = async (req, res, next) => {
    const result = new MyClass(MixedModel, req, res, next)
    result.updateSingleDataWithoutFile()
}
exports.UpdateSingleDataFile = async (req, res, next) => {
    const result = new MyClass(MixedModel, req, res, next)
    result.updateSingleDataWithFile("image", "uploads")
}
exports.DeleteSingleData = async (req, res, next) => {
    const result = new MyClass(MixedModel, req, res, next)
    result.deleteSingleDataWithFile("image", "uploads")
}
exports.GetAllDatasWithoutPagination = async (req, res, next) => {
    const result = new MyClass(MixedModel, req, res, next)
    result.getDatasWithoutPagination()
}
exports.FilterData = async (req, res, next) => {
    const result = new MyClass(MixedModel, req, res, next)
    const method = { types: { $eq: req.query.types } }
    result.filterData(method, 4)
}
exports.FilterAllByName = async (req, res, next) => {
    const {
        yearID,
        countryID,
        categoryID,
        genreID,
        languageID,
        qualityID,
        actorID,
        ageID,
        tagID,
    } = req.query;

    let method = { $and: [] }
    let dataArrays = method.$and


    if (yearID) dataArrays.push({ yearID: { $eq: yearID } })
    if (!yearID) dataArrays = dataArrays.filter((item) => { return item.yearID != yearID })
    if (countryID) dataArrays.push({ countryID: { $eq: countryID } })
    if (!countryID) dataArrays = dataArrays.filter((item) => { return item.countryID != countryID })
    if (categoryID) dataArrays.push({ categoryID: { $eq: categoryID } })
    if (!categoryID) dataArrays = dataArrays.filter((item) => { return item.categoryID != categoryID })
    if (genreID) dataArrays.push({ genreID: { $eq: genreID } })
    if (!genreID) dataArrays = dataArrays.filter((item) => { return item.genreID != genreID })
    if (languageID) dataArrays.push({ languageID: { $eq: languageID } })
    if (!languageID) dataArrays = dataArrays.filter((item) => { return item.languageID != languageID })
    if (qualityID) dataArrays.push({ qualityID: { $eq: qualityID } })
    if (!qualityID) dataArrays = dataArrays.filter((item) => { return item.qualityID != qualityID })
    if (actorID) dataArrays.push({ actorID: { $eq: actorID } })
    if (!actorID) dataArrays = dataArrays.filter((item) => { return item.actorID != actorID })
    if (ageID) dataArrays.push({ ageID: { $eq: ageID } })
    if (!ageID) dataArrays = dataArrays.filter((item) => { return item.ageID != ageID })
    if (tagID) dataArrays.push({ tagID: { $eq: tagID } })
    if (!tagID) dataArrays = dataArrays.filter((item) => { return item.tagID != tagID })
  

    const data = await MixedModel.find(method.$and == "" ? {} : method).lean()
    res.json({ data: data })

}

