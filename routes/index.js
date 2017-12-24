const express = require('express');
const axios = require('axios');
const router = express.Router();

axios.defaults.headers.Authorization = "token ddd";
axios.defaults.timeout = 10000;

const cherrypick = (value) => {
  return {
    name: value.data.name,
    url: value.data.html_url,
    description: value.data.description,
    stars: value.data.stargazers_count,
    forks: value.data.forks
  }
}
const getGithubDetail = (req, res, next) => {
  projectNames = ['Front-End-Checklist', 'vue-mobile-starter', 'react-mobile-starter', 'mSwiper.js', 'NodeApp-Deploy'];
  
  axios.get('https://api.github.com/users/johnsenzhou/repos')
    .then((data) => {
      const originData = data.data;
      const myFavoriteList = projectNames.map((itemName) => {
        let actionItem;
        originData.map((item) => {
          if (item.name === itemName) {
            actionItem = item;
          }
        })
        return actionItem;
      })

      res.locals.githubList = myFavoriteList;
      next();
    })
    .catch((err) => {
      res.render('error');
    })
};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { typed: true });
});
/* GET open sources page. */
router.get('/opensources', getGithubDetail, function(req, res) {
  const githubList = res.locals.githubList;
  res.render('pages/demo', { isdemo: true, githubList });
});
/* GET socket.io page. */
router.get('/socket', function(req, res) {
  res.render('pages/socket', { isSocket: true });
});

module.exports = router;
