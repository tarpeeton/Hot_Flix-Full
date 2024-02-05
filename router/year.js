const router = require("express").Router()
const {
    CreateNewData,
    GetAllDatas,
    GetSingleData,
    UpdateSingleData,
    DeleteSingleData
} = require("../controller/year")


router.post("/api/year/create", CreateNewData)
router.get("/api/year/all", GetAllDatas)
router.get("/api/year/:id", GetSingleData)
router.put("/api/year/:id", UpdateSingleData)
router.delete("/api/year/:id", DeleteSingleData)




module.exports = router