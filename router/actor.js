const router = require("express").Router()
const {
    CreateNewData,
    GetAllDatas,
    GetSingleData,
    UpdateSingleDataFile,
    UpdateSingleDataContext,
    DeleteSingleData
} = require("../controller/actor");
const { uploadMultiple } = require("../middleware/file-upload")


router.post("/api/actor/create", uploadMultiple(), CreateNewData)
router.get("/api/actor/all", GetAllDatas)
router.get("/api/actor/:id", GetSingleData)
router.put("/api/actor/context/:id", UpdateSingleDataContext)
router.put("/api/actor/file/:id", uploadMultiple(), UpdateSingleDataFile)
router.delete("/api/actor/:id", DeleteSingleData)




module.exports = router