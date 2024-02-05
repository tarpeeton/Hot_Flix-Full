const router = require("express").Router()
const {
    CreateNewData,
    GetAllDatas,
    GetSingleData,
    UpdateSingleData,
    DeleteSingleData
} = require("../controller/avatar");
const { uploadMultiple } = require("../middleware/file-upload")


router.post("/api/avatar/create", uploadMultiple(), CreateNewData)
router.get("/api/avatar/all", GetAllDatas)
router.get("/api/avatar/:id", GetSingleData)
router.put("/api/avatar/:id", uploadMultiple(), UpdateSingleData)
router.delete("/api/avatar/:id", DeleteSingleData)




module.exports = router