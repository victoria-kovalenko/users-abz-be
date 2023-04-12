const Router = require('express');
const positionController = require('../controllers/positions');

const positionRouter = Router.Router();

positionRouter.get('/positions', positionController.getAll);

module.exports = {
  routerPosition: positionRouter,
}