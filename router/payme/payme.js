const router = require("express").Router()
const Payme = require("../../controller/payme/payme");


// Enfpoint url
router.get("/api/payme/ozodbek", Payme.payme)




module.exports = router