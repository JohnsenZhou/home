const express = require('express');
const getGithubDetail = require('../middlewares/gitDetailFetch')
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { typed: true });
});
/* GET open sources page. */
router.get('/opensources', getGithubDetail, function(req, res) {
  const githubList = res.locals.githubList;
  const githubUser = res.locals.githubUser;
  res.render('pages/demo', { isdemo: true, githubList, githubUser });
});

module.exports = router;
