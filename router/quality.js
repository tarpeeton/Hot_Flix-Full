const router = require("express").Router()
const {
    CreateNewData,
    GetAllDatas,
    GetSingleData,
    UpdateSingleData,
    DeleteSingleData
} = require("../controller/quality")


router.post("/api/quality/create", CreateNewData)
router.get("/api/quality/all", GetAllDatas)
router.get("/api/quality/:id", GetSingleData)
router.put("/api/quality/:id", UpdateSingleData)
router.delete("/api/quality/:id", DeleteSingleData)




module.exports = router