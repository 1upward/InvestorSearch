var knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    bookshelf = require('bookshelf')(knex),
    async = require('async'),
    angelList = require('./angelList'),
    Promise = require('bluebird');

    // Companies = require
    // Markets = require

exports.companies = function(req, res) {
  //req.body is an array of objects that have a type and text
  var companies = [];
  var markets = [];

  for(var i = 0; i < req.body.length;i++){
    if(req.body[i].type === "company"){
      companies.push(req.body[i].text);
    } else {
      markets.push(req.body[i].text);
    }
  }



  var promiseArr = companies.map(function (company) {
    return new Promise(function(resolve, reject) {
      angelList.findCompanysInvestors(company, function(data) {
        resolve(data);
      });
    });
  });

  Promise.all(promiseArr).then(function(investors) {
    console.log('these are the investors we found and can send back');
    res.json(investors[0], 200);
  });

  // async.map(companies, angelList.findCompanysInvestors, function(err, investorResults){
  //   console.log('companies are: ');
  //   console.log(companies);
  //   console.log('These are the investorResults from search.companies');
  //   console.log(investorResults);
  // });


  // bookshelf.whereIn('name', companies); // here we want the angel list id, then we want to hit the angel list api route
  // bookshelf.whereIn('name', market); // here we want the angel list id, then we want to hit the angel list api route

  // var results = {
  //   id: 1,
  //   angelList_id: 1,
  //   name: 'Snapchat',
  //   crunchbase_permalink: 'marc-andreessen'
  // }

  // res.json(results, 200);
};
