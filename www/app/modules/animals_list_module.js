angular.module('AnimalsList', ['angular-bootstrap-select', 'angular-bootstrap-select.extra', 'ui.bootstrap', 'AnimalsListService'])
    .controller('AnimalsListController', ['$scope', 'AnimalsListService', '$window', function($scope, AnimalsListService, $window) {
        
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.limit = '10';
        
        $scope.animals = [];
        
        var ACL = this;
        
        this.getPagesCount = function(limit) {
            AnimalsListService.getPagesCount(limit)
                .then(function(data) {
                    $scope.totalItems = data.rowsCount;    
                },
                      function(data) {
                    console.log('Pages count retrieval failed.')
                });
        };
        
        this.getPagesCount($scope.limit);
        
        this.getAnimals = function(page, limit) {
            AnimalsListService.getAnimals(page, limit)
                .then(function(data) {
                    $scope.animals = data;    
                },
                      function(data) {
                    console.log('Animals retrieval failed.')
                });
        };
        
        this.getAnimals($scope.currentPage, $scope.limit);
        
        $scope.pageChanged = function() {
            ACL.getAnimals($scope.currentPage, $scope.limit);
        };
    }]);