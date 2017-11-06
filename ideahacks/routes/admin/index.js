const express = require('express')
const adminRouter = express.Router()
const adminHandlers = require('./admin.js')
const announcementHandlers = require('./announcements.js')
const applicationReviewHandlers = require('./application-review.js')
const teamHandlers = require('./teams.js')
const partsHandlers = require('./parts')
const h = require('../../helpers').authHelpers
const setResLocals = require('../../helpers').routeHelpers.setResLocals

adminRouter.get('/', setResLocals, h.isAdmin, adminHandlers.getAdmin)
adminRouter.get('/announcements', setResLocals, h.isAdmin, announcementHandlers.getAnnouncements)
adminRouter.post('/announcements', setResLocals, h.isAdmin, announcementHandlers.postAnnouncements)

adminRouter.post('/announcements/delete/:_id', setResLocals, h.isAdmin, announcementHandlers.deleteOneAnnouncement)

adminRouter.get('/application-review', setResLocals, h.isAdmin, applicationReviewHandlers.getApplicationReview)
adminRouter.get('/teams', setResLocals, h.isAdmin, teamHandlers.getTeams)
adminRouter.post('/teams', setResLocals, h.isAdmin, teamHandlers.postTeams)

adminRouter.get('/parts', setResLocals, h.isAdmin, partsHandlers.getParts)
adminRouter.post('/parts', setResLocals, h.isAdmin, partsHandlers.postParts)

adminRouter.delete('/teams/delete/:teamName', setResLocals, h.isAdmin, teamHandlers.deleteOneTeam)

module.exports = adminRouter
