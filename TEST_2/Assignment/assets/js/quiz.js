var app = angular.module("listquizz", []);
app.controller("ctrlquizz", function ($scope, $http) {

    $scope.cout = 0;
    $scope.pageCount = Math.ceil(12 / 4);
    $scope.prev = function() {
        if ($scope.cout > 0) {
            $scope.cout -= 4;
            console.log($scope.cout);
        }
    }
    $scope.next = function() {
        if ($scope.cout < ($scope.pageCount - 1) * 4) {
            $scope.cout += 4;
            console.log($scope.cout);
        }
    }
});

