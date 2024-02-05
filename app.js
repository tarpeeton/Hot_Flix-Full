// Requirement
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const fs = require("fs");
const path = require('path')
const bodyParser = require("body-parser")
const cors = require('cors')
const expressSession = require("express-session");
const mongodbConnectSession = require("connect-mongodb-session")(expressSession)
const expressEjsLayouts = require("express-ejs-layouts")
const cookieParser = require("cookie-parser")
const { PORT, DATABASE_OPTION, DATABASE_URL, SECRET_KEY, SECRET_TIME, COLLECTION } = require("./config/default")


// Middleware
const session = expressSession({
    secret: SECRET_KEY,
    saveUninitialized: false,
    store: new mongodbConnectSession({
        uri: DATABASE_URL,
        collection: COLLECTION,
    }),
    resave: false,
    cookie: {
        maxAge: SECRET_TIME,
        httpOnly: true,
        sameSite: "strict"
    }
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }))
app.use(session)
app.use(expressEjsLayouts)
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")


// Connection Database and Server;
const server = app.listen(PORT, () => console.log("Server is connected", server.address().port))
const database = async () => {
    try {
        await mongoose.connect(DATABASE_URL, DATABASE_OPTION)
        console.log("Database connected")
    }
    catch (error) {
        console.log("Error On Database", error.message)
    }
}
const create_folder = async () => {
    fs.mkdir(path.join(__dirname, "./public"), (error) => { })
    fs.mkdir(path.join(__dirname, "./public/uploads"), (error) => { })
}
database()
create_folder()


// Rest-API [Frontend]
app.use("/", require("./views/routes/client.route"))
app.use("/admin", require("./views/routes/admin.route"))
app.use("/moderator", require("./views/routes/moderator.route"))
app.use("/auth", require("./views/routes/auth.route"))


// Rest-API [Backend]
app.use(require("./router/user"))
app.use(require("./router/year"))
app.use(require("./router/quality"))
app.use(require("./router/age"))
app.use(require("./router/avatar"))
app.use(require("./router/category"))
app.use(require("./router/country"))
app.use(require("./router/genre"))
app.use(require("./router/language"))
app.use(require("./router/tag"))
app.use(require("./router/actor"))
app.use(require("./router/mixed"))
app.use(require("./router/video"))
app.use(require("./router/index"))




// If Route is not found, ...
app.all('*', async (req, res, next) => {
    res.redirect("/auth/404")
})



