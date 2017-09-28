const express = require('express');
const axios = require('axios');
const router = express.Router();

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
  projectNames = ['vue-mobile-starter', 'react-mobile-starter', 'mSwiper.js', 'NodeApp-Deploy'];
  
  console.time('getGithubData');
  let axiosList = projectNames.map((url) => {
    return axios.get(`https://api.github.com/repos/JohnsenZhou/${url}?access_token=f790db004872d705715b6d6533587b62979881d5`);
  });
  axios.all(axiosList)
    .then(axios.spread((vue, react, swiper, node) => {
      vueDetail = cherrypick(vue);
      reactDetail = cherrypick(react);
      swiperDetail = cherrypick(swiper);
      nodeApp = cherrypick(node);

      res.locals = { vueDetail, reactDetail, swiperDetail, nodeApp };
      console.timeEnd('getGithubData');
      next();
    }))
    .catch((err) => {
      console.log(err);
      res.render('error');
    })
};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { typed: true });
});
/* GET open sources page. */
router.get('/opensources', getGithubDetail, function(req, res) {
  const githubDetail = res.locals;
  const githubList = [githubDetail.vueDetail, githubDetail.reactDetail, githubDetail.swiperDetail, githubDetail.nodeApp];
  // console.log(githubList)
  res.render('pages/demo', { isdemo: true, githubList });
});

module.exports = router;

