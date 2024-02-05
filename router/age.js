const router = require("express").Router()
const {
    CreateNewData,
    GetAllDatas,
    GetSingleData,
    UpdateSingleData,
    DeleteSingleData
} = require("../controller/age")


router.post("/api/age/create", CreateNewData)
router.get("/api/age/all", GetAllDatas)
router.get("/api/age/:id", GetSingleData)
router.put("/api/age/:id", UpdateSingleData)
router.delete("/api/age/:id", DeleteSingleData)




module.exports = router