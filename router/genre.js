const router = require("express").Router()
const {
    CreateNewData,
    GetAllDatas,
    GetSingleData,
    UpdateSingleData,
    DeleteSingleData
} = require("../controller/genre")


router.post("/api/genre/create", CreateNewData)
router.get("/api/genre/all", GetAllDatas)
router.get("/api/genre/:id", GetSingleData)
router.put("/api/genre/:id", UpdateSingleData)
router.delete("/api/genre/:id", DeleteSingleData)


module.exports = router