(function () {
    angular.module("mainApp", ["ui.router", "apiModule"])
        .config(["$stateProvider", "$locationProvider", "$urlRouterProvider",  function ($stateProvider, $locationProvider, $urlRouterProvider) {
            $locationProvider.html5Mode(true);
            $stateProvider.state({
                name: "registration",
                url: "/registration",
                component: "layoutRegistration"
            });
            $stateProvider.state({
                name: "personal",
                url: "/personal",
                component: "layoutPersonal"
            });
            $urlRouterProvider.otherwise("/personal");
        }]);
})();
