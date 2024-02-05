const router = require("express").Router()
const {
    homePage,
} = require("../controller/index")


router.get("/api/home/all", homePage)


module.exports = router