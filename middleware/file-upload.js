const multer = require("multer")
const path = require("path")
const md5 = require("md5")

const folderName = "./public/uploads"

// Bitta fayl yuklash
const uploadSingle = () => {
    const uploading = multer({
        storage: multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, folderName)
            },
            filename: function (req, file, callback) {
                callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
            }
        })
    })
    return uploading.single("upload-single")
}


// Bir qancha fayl yuklash
const uploadMultiple = () => {
    const uploading = multer({
        storage: multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, folderName)
            },
            filename: function (req, file, callback) {
                callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
            }
        })
    })
    return uploading.array("upload-multiple", 12)
}

module.exports = {
    uploadSingle, uploadMultiple
}