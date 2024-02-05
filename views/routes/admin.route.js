const router = require("express").Router();

// Asosiy sahifa
router.get("/index", async (req, res, next) => {
    res.render(
        "./pages/admin/index.ejs",
        {
            layout: "./layouts/admin.layouts.ejs",
            title: "Dashboard"
        }
    )
})
// Yillar bolimi
router.get("/year",  async (req, res, next) => {
    res.render(
        "./pages/admin/year.ejs",
        {
            layout: "./layouts/admin.layouts.ejs",
            title: "Year unit"
        }
    )
})
// Video sifati
router.get("/quality",  async (req, res, next) => {
    res.render(
        "./pages/admin/quality.ejs",
        {
            layout: "./layouts/admin.layouts.ejs",
            title: "Quality unit"
        }
    )
})
// Yosh bo'limi
router.get("/age", async (req, res, next) => {
    res.render(
        "./pages/admin/age.ejs",
        {
            layout: "./layouts/admin.layouts.ejs",
            title: "Age unit"
        }
    )
})
// Avatar bo'limi
router.get("/avatar", async (req, res, next) => {
    res.render(
        "./pages/admin/avatar.ejs",
        {
            layout: "./layouts/admin.layouts.ejs",
            title: "Avatar unit"
        }
    )
})

// Kategoriya bo'limi
router.get("/category", async (req, res, next) => {
    res.render(
        "./pages/admin/category.ejs",
        {
            layout: "./layouts/admin.layouts.ejs",
            title: "Category unit"
        }
    )
})
// Davlatlar bo'limi
router.get("/country", async (req, res, next) => {
    res.render(
        "./pages/admin/country.ejs",
        {
            layout: "./layouts/admin.layouts.ejs",
            title: "Country unit"
        }
    )
})
// Janrlar bo'limi
router.get("/genre", async (req, res, next) => {
    res.render(
        "./pages/admin/genre.ejs",
        {
            layout: "./layouts/admin.layouts.ejs",
            title: "Genre unit"
        }
    )
})
// Tillar bo'limi
router.get("/language",  async (req, res, next) => {
    res.render(
        "./pages/admin/language.ejs",
        {
            layout: "./layouts/admin.layouts.ejs",
            title: "Language unit"
        }
    )
})
// Tillar bo'limi
router.get("/tag",  async (req, res, next) => {
    res.render(
        "./pages/admin/tag.ejs",
        {
            layout: "./layouts/admin.layouts.ejs",
            title: "Tag unit"
        }
    )
})

// Aktyorlar bo'limi
router.get("/actor", async (req, res, next) => {
    res.render(
        "./pages/admin/actor.ejs",
        {
            layout: "./layouts/admin.layouts.ejs",
            title: "Actor and Actress unit"
        }
    )
})
// Kino/Serial/multfilm bo'limi
router.get("/mixed",  async (req, res, next) => {
    res.render(
        "./pages/admin/mixed.ejs",
        {
            layout: "./layouts/admin.layouts.ejs",
            title: "Movie/Serial/Cartoon unit"
        }
    )
})
// Cideo bo'limi
router.get("/video", (req, res, next) => {
    res.render(
        "./pages/admin/video.ejs",
        {
            layout: "./layouts/admin.layouts.ejs",
            title: "Video unit"
        }
    )
})



module.exports = router