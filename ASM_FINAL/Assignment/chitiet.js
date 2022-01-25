
app.controller("chitietCtrl", function ($scope, $routeParams, $http, $window, $route, $timeout) {
    $scope.$on('$routeChangeSuccess', function () {
    });

    const emaillogged = localStorage.getItem('name');
    $scope.cauhoi = [];
    $scope.length;
    $scope.idmonhoc = $routeParams.idMH;
    $scope.cautraloi = [];
    $scope.listcautraloi = [];
    $http.get("assets/db/Quizs/" + $scope.idmonhoc + ".js").then(
        function (d) { $scope.cauhoi = d.data; })
        .then(function () {
            db.collection('details').where("Idmonhoc", "==", $scope.idmonhoc).get().then(snapshot => {
                snapshot.forEach(function (doc) {
                    for (var i = 0; i < $scope.cauhoi.length; i++) {
                        if ($scope.cauhoi[i].Text === doc.data().cauhoi && doc.data().email === emaillogged) {
                            $scope.listcautraloi.push($scope.cauhoi[i]);
                        }
                    }
                })
                localStorage.setItem('length', $scope.listcautraloi.length);
                $scope.length = localStorage.getItem('length');
                localStorage.removeItem('length');
            }).then(function () {
                db.collection('details').where("Idmonhoc", "==", $scope.idmonhoc).get().then(snapshot => {
                    snapshot.forEach(function (doc) {
                        angular.forEach($scope.listcautraloi, function (item, index) {
                            if (item.Text === doc.data().cauhoi) {
                                item.Dapanchon = doc.data().dapanchon;
                            }
                        })
                    })
                })
                $scope.$apply();
            });
        }),

        function (d) { alert("Lỗi rồi nè") };


    $scope.begin = 0;
    $scope.prev = function () {
        $scope.begin--;
        if ($scope.begin < 0) {
            $scope.begin = 0;
            return;
        }
    }

    $scope.next = function () {
        $scope.begin++;
        if ($scope.begin >= $scope.length) {
            $scope.begin = $scope.length - 1;
            return;
        }
    };


    $scope.sec = 0;
    $scope.onTimeout = function () {
        $scope.sec++;
        mytimeout = $timeout($scope.onTimeout, 1);

    }
    var mytimeout = $timeout($scope.onTimeout, 1);

})