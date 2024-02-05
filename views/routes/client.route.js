const router = require("express").Router();

// Asosiy sahifa
router.get("/", async (req, res, next) => {
    res.render(
        "./pages/client/index.ejs",
        {
            layout: "./layouts/client.layouts.ejs",
            title: "HotFlix"
        }
    )
})
// Filtrlash sahifasi
router.get("/filter", async (req, res, next) => {
    res.render(
        "./pages/client/filter.ejs",
        {
            layout: "./layouts/client.layouts.ejs",
            title: "HotFlix"
        }
    )
})
// Kino/Serial.Multfilmga oid boshqa videolar
router.get("/video-list/:id", async (req, res, next) => {
    res.render(
        "./pages/client/video-list.ejs",
        {
            layout: "./layouts/client.layouts.ejs",
            title: "HotFlix"
        }
    )
})
// Videoni alohida ochish uchun 
router.get("/:id", async (req, res, next) => {
    res.render(
        "./pages/client/video.ejs",
        {
            layout: "./layouts/client.layouts.ejs",
            title: "HotFlix"
        }
    )
})



module.exports = router