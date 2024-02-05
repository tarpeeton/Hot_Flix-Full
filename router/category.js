const router = require("express").Router()
const {
    CreateNewData,
    GetAllDatas,
    GetSingleData,
    UpdateSingleData,
    DeleteSingleData
} = require("../controller/category")


router.post("/api/category/create", CreateNewData)
router.get("/api/category/all", GetAllDatas)
router.get("/api/category/:id", GetSingleData)
router.put("/api/category/:id", UpdateSingleData)
router.delete("/api/category/:id", DeleteSingleData)


module.exports = router