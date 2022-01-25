var app = angular.module("myApp", ['ngRoute']);
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/trang-chu", {
            templateUrl: "./layout/trangchu.html"
        })
        .when("/gioi-thieu", {
            templateUrl: "./layout/gioiThieu.html"
        })
        .when("/lien-he", {
            templateUrl: "./layout/lienHe.html"
        })
        .when("/gop-y", {
            templateUrl: "./layout/gopY.html"
        })
        .when("/hoi-dap", {
            templateUrl: "./layout/hoiDap.html"
        })
        .when("/dang-nhap", {
            templateUrl: "./layout/dangNhap.html",
            controller: "dangNhapCtrl"
        })
        .otherwise({
            redirectTo: "/trang-chu"
        })
});

app.run(function ($rootScope, $http) {
    $rootScope.lstStudents = [];
    $http.get("../db/lstStudents.json").then(function (response) {
        $rootScope.lstStudents = response.data;
    });
});


// --------- dang nhap-----------------
app.controller("dangNhapCtrl", function ($scope, $rootScope) {
    $scope.login = function () {
        var dangNhapThanhCong = false;
        $rootScope.lstStudents.forEach(st => {
            if ($scope.username == st.username && $scope.password == st.password) {
                dangNhapThanhCong = true;
                $rootScope.indexStudent = st.index;
                $rootScope.student = st;
            }
        });
        if (dangNhapThanhCong) {
            alert('OK');
        } else {
            alert('Sai');
        }
    };
});

