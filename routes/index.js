const express = require('express');
const axios = require('axios');
const router = express.Router();

axios.defaults.headers.Authorization = "token ddd";
axios.defaults.timeout = 10000;

const getGithubDetail = (req, res, next) => {
  projectNames = ['Front-End-Checklist', 'vue-mobile-starter', 'react-mobile-starter', 'mSwiper.js', 'NodeApp-Deploy'];
  
  axios.get('https://api.github.com/users/johnsenzhou/repos')
    .then(data => {
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

      axios.get('https://api.github.com/orgs/ewellfe/repos')
        .then(data => {
          const evell = data.data[0]
          myFavoriteList.push(evell)
          res.locals.githubList = myFavoriteList
          next();
        })
        .catch((err) => {
          console.log('evell 获取失败')
          res.locals.githubList = myFavoriteList
          next();
        })
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
