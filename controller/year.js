const YearModel = require("../model/year");
const MyClass = require("../config/class")

exports.CreateNewData = async (req, res, next) => {
    const result = new MyClass(YearModel, req, res, next)
    result.createData()
}
exports.GetAllDatas = async (req, res, next) => {
    const result = new MyClass(YearModel, req, res, next)
    result.getDatas(10)
}
exports.GetSingleData = async (req, res, next) => {
    const result = new MyClass(YearModel, req, res, next)
    result.getData()
}
exports.UpdateSingleData = async (req, res, next) => {
    const result = new MyClass(YearModel, req, res, next)
    result.updateSingleDataWithoutFile()
}
exports.DeleteSingleData = async (req, res, next) => {
    const result = new MyClass(YearModel, req, res, next)
    result.deleteSingleDataWithoutFile()
}