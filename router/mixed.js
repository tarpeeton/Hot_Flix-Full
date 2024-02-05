const router = require("express").Router()
const {
    CreateNewData,
    GetAllDatas,
    GetSingleData,
    UpdateSingleDataContext,
    UpdateSingleDataFile,
    DeleteSingleData,
    GetAllDatasWithoutPagination,
    FilterData,
    FilterAllByName
} = require("../controller/mixed");
const { uploadMultiple } = require("../middleware/file-upload")


router.post("/api/mixed/create", uploadMultiple(), CreateNewData)
router.get("/api/mixed/all", GetAllDatas)
router.get("/api/mixed/total", GetAllDatasWithoutPagination)
router.get("/api/mixed/filter", FilterData)
router.get("/api/mixed/filters", FilterAllByName)
router.get("/api/mixed/:id", GetSingleData)
router.put("/api/mixed/context/:id", UpdateSingleDataContext)
router.put("/api/mixed/file/:id", uploadMultiple(), UpdateSingleDataFile)
router.delete("/api/mixed/:id", DeleteSingleData)




module.exports = router