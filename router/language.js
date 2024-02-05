const router = require("express").Router()
const {
    CreateNewData,
    GetAllDatas,
    GetSingleData,
    UpdateSingleData,
    DeleteSingleData
} = require("../controller/language")


router.post("/api/language/create", CreateNewData)
router.get("/api/language/all", GetAllDatas)
router.get("/api/language/:id", GetSingleData)
router.put("/api/language/:id", UpdateSingleData)
router.delete("/api/language/:id", DeleteSingleData)


module.exports = router