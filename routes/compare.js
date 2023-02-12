const postSkillCompare = require('../controllers/compare');

const compareRouter = require('express').Router();

compareRouter.post('/', postSkillCompare);

module.exports = compareRouter;
