const router = require("express").Router()
const {
    CreateNewData,
    GetAllDatas,
    GetSingleData,
    UpdateSingleData,
    DeleteSingleData
} = require("../controller/country")


router.post("/api/country/create", CreateNewData)
router.get("/api/country/all", GetAllDatas)
router.get("/api/country/:id", GetSingleData)
router.put("/api/country/:id", UpdateSingleData)
router.delete("/api/country/:id", DeleteSingleData)


module.exports = router