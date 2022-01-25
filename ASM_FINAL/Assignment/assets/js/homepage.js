var app = angular.module("myApp", ["ngRoute"]);

gapi.load('auth2', initSigninV2);

function initSigninV2() {
    gapi.auth2.init({
        // client_id: '38103395762-a03gvbvshdtca3gkcu93hro5gajsr94e.apps.googleusercontent.com'
        client_id: "830102791057-uh6nd15bhc6laq6h21lkc1gfuu6tpdke.apps.googleusercontent.com"
    }).then(function (authInstance) {
        // now auth2 is fully initialized
    });
}

var currentUser = localStorage.getItem('name');
if (currentUser != null) {
    console.log("Loaded page : " + currentUser);
    window.location.href = '#!/';
} else {
}

app.controller("homepageCtrl", function ($scope) {
    $scope.check;

    $scope.viewLoaded = function () {
    }
    if (currentUser != null) {
        $scope.check = "";
        $scope.checkLogin = "Đăng Xuất";
        $scope.logout = function () {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                localStorage.clear();
            });
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Bạn đã đăng xuất tài khoản!',
                heightAuto: true,
                width: 500,
                timer: 1000
            }).then(function () {
                window.location.reload();
            });
        }
    } else {
        $scope.checkLogin = "Đăng Nhập";
        $scope.check = "#!login";
    }
})

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "html/index.html" })
        .when("/gioithieu", { templateUrl: "html/gioithieu.html", controller: "gioithieuCtrl" })
        .when("/lienhe", { templateUrl: "html/lienhe.html" })
        .when("/login", { templateUrl: "html/login.html", controller: "loginCtrl" })
        .when("/dangky", { templateUrl: "html/dangky.html", controller: "dangkyCtrl" })
        .when("/ketqua", { templateUrl: "html/ketqua.html", controller: "ketquaCtrl" })
        .when("/quizonline", { templateUrl: "html/quizonline.html", controller: "quizCtrl" })
        .when("/quizonline/:idMH", { templateUrl: "html/lamquiz.html", controller: "lamquizCtrl" })
        .otherwise({ redirectTo: "html/index" });
});


