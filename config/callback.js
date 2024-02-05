exports.SuccessCallback = async (data, req, res, next) => {
    return res.json({
        status: true,
        data: data
    })
}
exports.ErrorCallback = async (error, req, res, next) => {
    return res.json({
        status: false,
        error: error
    })
}