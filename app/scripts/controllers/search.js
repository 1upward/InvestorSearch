'use strict';

angular.module('investorSearchApp')
  .controller('SearchCtrl', function ($scope, $q, Search, Autocomplete) {
    $scope.constraints = [{text: ''}];
    $scope.selectedCompanies = [];
    $scope.selectedMarkets = [];

    $scope.investors = [];

    // $scope.addField = function() {
    //   $scope.constraints.push({text: ''});
    // };
    // $scope.removeField = function(index) {
    //   $scope.constraints.splice(index, 1);
    // };
    $scope.search = function(){
      //------------------------------- REAL SEARCH FUNCTION BELOW:
      console.log("companies in search");
      console.log($scope.companies);
      var constraints = {
        companies: $scope.selectedCompanies,
        markets: $scope.selectedMarkets
      };

      //show spinner
      $(".spinner").removeClass('ng-hide');

      // call search service here with constraints array
      Search.getInvestors(constraints).then(function(investorsFromPromise) {
        $scope.investors = investorsFromPromise.data;
        // remove spinner
        $(".spinner").addClass('ng-hide');
        console.log($scope.investors);
      });

    //---------------------------- FAKE SEARCH FUNCTION BELOW TO TEST RANKING

    // $scope.investors = [];
    // for(var i = 0; i < fake_investors.length; i++){
    //   if($scope.investors.indexOf(fake_investors[i]) === -1){
    //     $scope.investors.push(fake_investors[i]);
    //   } else if (fake_investors[i] === $scope.investors)
    // }

    };

    $scope.completeCompanies = function(value) {
      var deferred = $q.defer();
      var returnedCompanyNames = [];
      Autocomplete.company(value).then(function(companies, headers){
        deferred.resolve(companies);
      });
      return deferred.promise;
    }

    $scope.completeMarkets = function(value) {
     var deferred = $q.defer();
      var returnedMarketNames = [];
      Autocomplete.market(value).then(function(markets, headers){
        deferred.resolve(markets);
      });
      return deferred.promise;

    }

  });
