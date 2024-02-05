const router = require("express").Router();

// Asosiy sahifa
router.get("/index",async (req, res, next) => {
    res.render(
        "./pages/moderator/index.ejs",
        {
            layout: "./layouts/moderator.layouts.ejs",
            title: "Moderator - Dashboard"
        }
    )
})



module.exports = router