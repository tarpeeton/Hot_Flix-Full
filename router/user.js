const router = require("express").Router()
const {
    signUp,
    signIn,
    confirmCode,
    logOut,
    decodeToken
} = require("../controller/user")


router.post("/api/user/sign-up", signUp)
router.post("/api/user/sign-in", signIn)
router.get("/api/user/confirm", confirmCode)
router.get("/api/user/log-out", logOut)
router.get("/api/user/decode", decodeToken)




module.exports = router