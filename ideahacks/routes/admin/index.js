const express = require("express")
const adminRouter = express.Router()
const adminHandlers = require("./admin.js")
const applicationReviewHandlers = require("./application-review.js")
const teamHandlers = require("./teams.js")
const partsHandlers = require("./parts")
const h = require("../../helpers").authHelpers
const setResLocals = require("../../helpers").routeHelpers.setResLocals

adminRouter.get("/", setResLocals, h.isAdmin, adminHandlers.getAdmin)

adminRouter.get("/application-review", setResLocals, h.isAdmin, applicationReviewHandlers.getApplicationReview)
adminRouter.get("/teams", setResLocals, h.isAdmin, teamHandlers.getTeams)
adminRouter.post("/teams", setResLocals, h.isAdmin, teamHandlers.postTeams)

adminRouter.get("/parts", setResLocals, h.isAdmin, partsHandlers.getParts)
adminRouter.post("/parts", setResLocals, h.isAdmin, partsHandlers.postParts)

adminRouter.get("/create", setResLocals, h.isAdmin, partsHandlers.createParts)

adminRouter.delete("/teams/delete/:teamName", setResLocals, h.isAdmin, teamHandlers.deleteOneTeam)

module.exports = adminRouter
