const express = require('express')
const adminRouter = express.Router()
const adminHandlers = require('./admin.js')
const announcementHandlers = require('./announcements.js')
const applicationReviewHandlers = require('./application-review.js')
const teamHandlers = require('./teams.js')
const partsHandlers = require('./parts')
const h = require('../../helpers').authHelpers

adminRouter.get('/', h.isAuthenticated, adminHandlers.getAdmin)

adminRouter.get('/announcements', h.isAuthenticated, announcementHandlers.getAnnouncements)
adminRouter.post('/announcements', h.isAuthenticated, announcementHandlers.postAnnouncements)
adminRouter.delete('/announcements', h.isAuthenticated, announcementHandlers.nukeAnnouncements)

adminRouter.get('/application-review', applicationReviewHandlers.getApplicationReview)

adminRouter.get('/teams', h.isAuthenticated, teamHandlers.getTeams)
adminRouter.post('/teams', h.isAuthenticated, teamHandlers.postTeams)
adminRouter.delete('/teams', h.isAuthenticated, teamHandlers.deleteTeams)

adminRouter.get('/parts', h.isAuthenticated, partsHandlers.getParts)
adminRouter.post('/parts', h.isAuthenticated, partsHandlers.postParts)
adminRouter.delete('/parts', h.isAuthenticated, partsHandlers.deleteParts)

module.exports = adminRouter
