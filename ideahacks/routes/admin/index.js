const express = require('express')
const adminRouter = express.Router()
const adminHandlers = require('./admin.js')
const announcementHandlers = require('./announcements.js')
const applicationReviewHandlers = require('./application-review.js')
const teamHandlers = require('./teams.js')
const partsHandlers = require('./parts')
const h = require('../../helpers').authHelpers
const setResLocals = require('../../helpers').routeHelpers.setResLocals

adminRouter.get('/', setResLocals, h.isAuthenticated, adminHandlers.getAdmin)
adminRouter.get('/announcements', setResLocals, h.isAuthenticated, announcementHandlers.getAnnouncements)
adminRouter.post('/announcements', setResLocals, h.isAuthenticated, announcementHandlers.postAnnouncements)
adminRouter.delete('/announcements', setResLocals, h.isAuthenticated, announcementHandlers.nukeAnnouncements)

adminRouter.post(
  '/admin/announcements/delete/:_id',
  setResLocals,
  h.isAuthenticated,
  announcementHandlers.deleteOneAnnouncement
)
adminRouter.get('/application-review', setResLocals, h.isAuthenticated, applicationReviewHandlers.getApplicationReview)
adminRouter.get('/teams', setResLocals, h.isAuthenticated, teamHandlers.getTeams)
adminRouter.post('/teams', setResLocals, h.isAuthenticated, teamHandlers.postTeams)
adminRouter.delete('/teams', setResLocals, h.isAuthenticated, teamHandlers.deleteTeams)

adminRouter.get('/parts', setResLocals, /* h.isAuthenticated, */ partsHandlers.getParts)
adminRouter.post('/parts', setResLocals, h.isAuthenticated, partsHandlers.postParts)
adminRouter.delete('/parts', setResLocals, h.isAuthenticated, partsHandlers.deleteParts)

adminRouter.delete('/teams/delete/:teamName', setResLocals, h.isAuthenticated, teamHandlers.deleteOneTeam)

module.exports = adminRouter
