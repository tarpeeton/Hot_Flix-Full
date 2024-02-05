const router = require("express").Router()
const {
    CreateNewData,
    GetAllDatas,
    GetSingleData,
    UpdateSingleData,
    DeleteSingleData
} = require("../controller/tag")


router.post("/api/tag/create", CreateNewData)
router.get("/api/tag/all", GetAllDatas)
router.get("/api/tag/:id", GetSingleData)
router.put("/api/tag/:id", UpdateSingleData)
router.delete("/api/tag/:id", DeleteSingleData)


module.exports = router