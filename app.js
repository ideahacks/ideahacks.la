const express = require("express")
const bodyParser = require("body-parser")
const boolParser = require("express-query-boolean")
const path = require("path")
const favicon = require("serve-favicon")
const hbs = require("hbs")
const passport = require("passport")
const hbsutils = require("hbs-utils")(hbs)
const morgan = require("morgan")
const sslRedirect = require("heroku-ssl-redirect").default

const ideahacks = require("./ideahacks")

let app = express()

// HTTPS Redirect
app.use(sslRedirect(["production"], 301))

// Logging
app.use(morgan("dev"))

// View and Asset Handling
app.set("port", process.env.PORT || 3000)
app.set("view engine", "hbs")
hbs.registerHelper("if_even", function(conditional, options) {
	if (conditional % 2 === 0) {
		return options.fn(this)
	} else {
		return options.inverse(this)
	}
})
hbs.registerPartial("navbar", path.join(__dirname, "/views/partials/navbar.hbs"))
hbs.registerPartial("footer", path.join(__dirname, "/views/partials/footer.hbs"))
hbs.registerPartial("applicationModal", path.join(__dirname, "/views/partials/applicationModal.hbs"))
hbs.registerPartial("dashboardPartsModal", path.join(__dirname, "/views/partials/dashboardPartsModal.hbs"))
hbs.registerPartial("filter", path.join(__dirname, "/views/partials/filter.hbs"))
hbs.registerPartial("teamCreationModal", path.join(__dirname, "/views/partials/teamCreationModal.hbs"))

hbsutils.registerWatchedPartials(path.join(__dirname, "/views/partials"))

app.use(favicon(path.join(__dirname, "public", "favicon.ico")))
app.use(express.static(path.join(__dirname, "views")))
app.use(express.static(path.join(__dirname, "public")))

// Body Parsing (for parsing HTTP Requests)
app.use(bodyParser.json())
app.use(boolParser())
app.use(bodyParser.urlencoded({ extended: true }))

// Session handling
app.use(ideahacks.session)
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use(ideahacks.routes.mainRouter)
app.use("/admin", ideahacks.routes.adminRouter)
app.use("/dashboard", ideahacks.routes.dashboardRouter)
app.use(ideahacks.routes.partsRouter)
app.use(ideahacks.routes.teamRouter)
app.use(ideahacks.routes.userRouter)
app.use((req, res) => {
	res.status(404).render("error", { status: res.statusCode })
})
app.use((err, req, res, next) => {
	if (err) console.log(err)
	res.status(500).render("error", { status: res.statusCode })
})

module.exports = app
