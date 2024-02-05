const router = require("express").Router();

// Kirish
router.get("/sign-in", async (req, res, next) => {
    res.render(
        "./pages/auth/sign-in.ejs",
        {
            layout: "./layouts/auth.layouts.ejs",
            title: "Kirish"
        }
    )
})
// Parolni qayta tiklash - 1
router.get("/forget-password", async (req, res, next) => {
    res.render(
        "./pages/auth/forget-password.ejs",
        {
            layout: "./layouts/auth.layouts.ejs",
            title: "Parolni riklash"
        }
    )
})

// Parolni qayta tiklash - 2
router.get("/reset-password/:token", async (req, res, next) => {
    res.render(
        "./pages/auth/reset-password.ejs",
        {
            layout: "./layouts/auth.layouts.ejs",
            title: "Yangi parol o'rnatish"
        }
    )
})

// Sahifa topilmasa, ...
router.get("/404", async (req, res, next) => {
    res.render(
        "./pages/auth/404.ejs",
        {
            layout: "./layouts/auth.layouts.ejs",
            title: "Sahifa topilmadi"
        }
    )
})


module.exports = router