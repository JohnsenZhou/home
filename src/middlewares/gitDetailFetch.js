const axios = require('axios');

// axios.defaults.headers.Authorization = "token fcf93db12eac5589098938dcf218c9e070cb3fde";
// axios.defaults.timeout = 10000;
const access_token = 'fcf93db12eac5589098938dcf218c9e070cb3fde'

const fetchOne = () => axios.get('https://api.github.com/users/johnsenzhou/repos', {access_token})
const fetchTwo = () => axios.get('https://api.github.com/orgs/ewellfe/repos', {access_token})

const getGithubDetail = (req, res, next) => {
  projectNames = ['Front-End-Checklist', 'vue-mobile-starter', 'react-mobile-starter', 'mSwiper.js', 'NodeApp-Deploy'];
  console.log('<<<<<<<<<<')
  axios.all([fetchOne(), fetchTwo()])
    .then(axios.spread((fetchOneData, fetchTwoData) => {
      console.log('>>>>>>')
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
      res.locals.githubUser = {
        name: fetchOneList[0].owner.login,
        avatar: fetchOneList[0].owner.avatar_url
      }
      console.log('detaildddddddd', res.locals.githubUser)
      // 团队项目
      const fetchTwoList = fetchTwoData.data[0]
      res.locals.githubList = [...fetchOneList, fetchTwoList]
      next();
    }))
    .catch((err) => {
      console.log('errorrrrrrrr', err)
      res.render('error');
    })
};

module.exports = getGithubDetail;
