const express = require("express")
const dashboardRouter = express.Router()
const dashboardHandlers = require("./dashboard.js")
const applicationHandlers = require("./application.js")
const h = require("../../helpers").authHelpers
const setResLocals = require("../../helpers").routeHelpers.setResLocals

dashboardRouter.get("/", setResLocals, h.isVerified, dashboardHandlers.getMe)

// Disabled application routes due to end of application period
dashboardRouter.get("/application", setResLocals, h.isVerified, applicationHandlers.getApplication)
dashboardRouter.post("/application", setResLocals, h.isVerified, applicationHandlers.postApplication)

dashboardRouter.get("/parts", setResLocals, h.isVerified, dashboardHandlers.getParts)

dashboardRouter.get("/me", setResLocals, h.isVerified, dashboardHandlers.getMe)
dashboardRouter.post("/me", setResLocals, h.isVerified, dashboardHandlers.postMe)

dashboardRouter.get("/me/parts", setResLocals, h.isVerified, dashboardHandlers.getMyParts)

module.exports = dashboardRouter
