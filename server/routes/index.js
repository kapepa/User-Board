const express = require('express');
const apiRouter = express.Router();

const usersController = require('./userModule/usersController')

apiRouter.use('/users',usersController);

module.exports = apiRouter;
