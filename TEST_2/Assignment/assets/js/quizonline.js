app.controller('quizCtrl', function ($scope, $routeParams, $route, $http) {
    $scope.caccauhoi = [];
    $scope.idMH = $routeParams.idMH;
    $scope.tenMH = $routeParams.tenMH;

    $scope.subjects = [];
    $http.get("assets/db/Subjects.js").then(function (d) { $scope.subjects = d.data; });

    $scope.begin = 4;
    $scope.prev = function () {
        if ($scope.begin > 0) {
            $scope.begin -= 4;
        } else if ($scope.begin == 0) {
            $scope.begin = 16;
        }
        
    };
    $scope.next = function () {
        if ($scope.begin < (Math.ceil($scope.subjects.length / 4) - 1) * 4) {
            $scope.begin += 4;
        } else if ($scope.begin == ($scope.subjects.length - 4)) {
            $scope.begin = 0;
        }
    };

    $scope.lambai = function () {
        $scope.caccauhoi = [];
        $scope.idMH = $routeParams.idMH;
        $scope.tenMH = $routeParams.tenMH;
        $http.get("database/" + $scope.idMH + ".js").then(
            function (d) { $scope.caccauhoi = d.data; },
            function (d) { alert("Lỗi rồi bạn!"); }
        )
    };



});