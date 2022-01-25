var app = angular.module("myApp", ['ngRoute']);
app.config(function ($routeProvider){
    $routeProvider
    // menu
        .when("/home", {
            templateUrl: "bai4/home.html"
        })
        .when("/about", {
            templateUrl: "bai4/about.html"
        })
        .when("/contact", {
            templateUrl: "bai4/contact.html"
        })
        .when("/feedback", {
            templateUrl: "bai4/feedback.html"
        })
        .when("/faq", {
            templateUrl: "bai4/faq.html"
        })
    // sub menu account
        .when("/account/login",{
            templateUrl: "bai4/account/login.html"
        })
        .when("/account/forgot",{
            templateUrl: "bai4/account/forgot.html"
        })
        .when("/account/register",{
            templateUrl: "bai4/account/register.html"
        })
        .when("/account/logout",{
            templateUrl: "bai4/account/logout.html"
        })
        .when("/account/change",{
            templateUrl: "bai4/account/change.html"
        })
        .when("/account/profile",{
            templateUrl: "bai4/account/profile.html"
        })
        .when("/account/orders",{
            templateUrl: "bai4/account/orders.html"
        })
        .when("/account/products",{
            templateUrl: "bai4/account/products.html"
        })
        // sidebar
        .when("/category/:id",{
            templateUrl: "bai4/ProductList.html",
            controller: "categoryCtrl"
        })
        .when("/supplier/:id",{
            templateUrl: "bai4/ProductList.html",
            controller: "supplierCtrl"
        })
        .when("/special/:id",{
            templateUrl: "bai4/ProductList.html",
            controller: "specialCtrl"
        })
        .otherwise({
            redirectTo: "/home"
        })
      
});

app.run(function($rootScope){
    $rootScope.$on("$routeChangeStart", function(){
        $rootScope.loading = true;
    })
    $rootScope.$on("$routeChangeSuccess", function(){
        $rootScope.loading = false;
    })
    $rootScope.$on("$routeChangeError", function(){
        $rootScope.loading = false;
        alert('Lỗi');
    })
})