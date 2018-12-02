const express = require('express');
const axios = require('axios');
const router = express.Router();

// axios.defaults.headers.Authorization = "token ddd";
axios.defaults.timeout = 10000;

const fetchOne = () => axios.get('https://api.github.com/users/johnsenzhou/repos')
const fetchTwo = () => axios.get('https://api.github.com/orgs/ewellfe/repos')

const getGithubDetail = (req, res, next) => {
  projectNames = ['Front-End-Checklist', 'Front-End-Performance-Checklist', 'vue-mobile-starter', 'react-mobile-starter', 'mSwiper.js', 'NodeApp-Deploy'];
  
  axios.all([fetchOne(), fetchTwo()])
    .then(axios.spread((fetchOneData, fetchTwoData) => {
      const originDataOne = fetchOneData.data;
      // 私人项目
      const fetchOneList = projectNames.map((itemName) => {
        let actionItem;
        originDataOne.map((item) => {
          if (item.name === itemName) {
            actionItem = item;
          }
        })
        return actionItem;
      })
      // 团队项目
      const fetchTwoList = fetchTwoData.data[0]
      res.locals.githubList = [...fetchOneList, fetchTwoList]
      next();
    }))
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

module.exports = router;
