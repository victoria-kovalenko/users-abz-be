"use strict";
const expressRouter = require('express');
const usersController = require('../controllers/users');
const router = expressRouter.Router();
router.get('/users', usersController.getAll);
router.post('/users', usersController.uploadNewUser);
router.get('/users/:userId', usersController.getById);
module.exports = {
    router,
};
