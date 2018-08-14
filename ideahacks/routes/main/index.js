const express = require('express');
const mainRouter = express.Router();
const staticHandlers = require('./static.js');
const authHandlers = require('./auth.js');
const setResLocals = require('../../helpers').routeHelpers.setResLocals;
const h = require('../../helpers').authHelpers;

mainRouter.get('/', setResLocals, staticHandlers.getMain);

mainRouter.get('/team', setResLocals, staticHandlers.getTeam);
mainRouter.get('/venue', setResLocals, staticHandlers.getVenue);

mainRouter.get('/login', authHandlers.getLogin);
mainRouter.post('/login', authHandlers.postLogin);
mainRouter.post('/login/recoverPassword/:email', authHandlers.recoverPassword);

mainRouter.get('/registration', authHandlers.getRegistration);
mainRouter.post('/registration', authHandlers.postRegistration);

mainRouter.get('/confirm', h.isAuthenticated, staticHandlers.getConfirm);
mainRouter.post('/confirm', h.isAuthenticated, authHandlers.postConfirm);

mainRouter.get('/verify/:hash', authHandlers.getVerify);

mainRouter.get('/logout', authHandlers.getLogout);

module.exports = mainRouter;
