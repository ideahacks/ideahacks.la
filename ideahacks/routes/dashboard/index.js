const express = require("express")
const dashboardRouter = express.Router()
const dashboardHandlers = require("./dashboard.js")
const applicationHandlers = require("./application.js")
const staticHandlers = require("./static.js")
const h = require("../../helpers").authHelpers
const setResLocals = require("../../helpers").routeHelpers.setResLocals

dashboardRouter.get("/", setResLocals, h.isVerified, dashboardHandlers.getMe)

// APPLICATIONS ARE CLOSED
dashboardRouter.get("/application", setResLocals, h.isVerified, applicationHandlers.getApplication)
dashboardRouter.post("/application", setResLocals, h.isVerified, applicationHandlers.postApplication)

dashboardRouter.get("/parts", setResLocals, h.isVerified, dashboardHandlers.getParts)

dashboardRouter.get("/teams", setResLocals, h.isVerified, dashboardHandlers.getTeams)

dashboardRouter.get("/me", setResLocals, h.isVerified, dashboardHandlers.getMe)

dashboardRouter.post("/me/settings", setResLocals, h.isVerified, dashboardHandlers.postSettings)
dashboardRouter.get("/me/settings", setResLocals, h.isVerified, dashboardHandlers.getSettings)

dashboardRouter.get("/me/parts", setResLocals, h.isVerified, dashboardHandlers.getMyParts)

dashboardRouter.get("/resources", setResLocals, staticHandlers.getResources)

module.exports = dashboardRouter
