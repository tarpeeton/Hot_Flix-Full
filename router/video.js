const router = require("express").Router()
const {
    CreateNewData,
    GetAllDatas,
    GetSingleData,
    UpdateSingleDataContext,
    UpdateSingleDataImage,
    UpdateSingleDataVideo,
    DeleteData,
    FilterByMixed,
    GetData
} = require("../controller/video");
const { uploadMultiple } = require("../middleware/file-upload")


router.post("/api/video/create", uploadMultiple(), CreateNewData)

router.get("/api/video/all", GetAllDatas)
router.get("/api/video/filter", FilterByMixed) // Yagona MIXED_ID bo'yicha hamma videolarni olish
router.get("/api/video/single", GetData)
router.get("/api/video/:id", GetSingleData)

router.put("/api/video/context/:id", UpdateSingleDataContext)
router.put("/api/video/image/:id", uploadMultiple(), UpdateSingleDataImage)
router.put("/api/video/file/:id", uploadMultiple(), UpdateSingleDataVideo)

router.delete("/api/video/:id", DeleteData)


module.exports = router